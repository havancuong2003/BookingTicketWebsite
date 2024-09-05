import axios, {
    AxiosInstance,
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";
import { logout } from "../services";

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (
    error: AxiosError | null,
    token: string | null = null
) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

export function setupInterceptors(axiosInstance: AxiosInstance) {
    // Request interceptor
    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error: AxiosError) => Promise.reject(error)
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest =
                error.config as InternalAxiosRequestConfig & {
                    _retry?: boolean;
                };
            console.log("check error", error);
            // Check if the error is due to an expired or invalid access token
            if (error.response?.status === 401 && !originalRequest._retry) {
                const errorData = error.response.data as {
                    error?: string;
                    message?: string;
                };

                if (
                    errorData.error === "EXPIRED_ACCESS_TOKEN" ||
                    errorData.error === "INVALID_ACCESS_TOKEN"
                ) {
                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            failedQueue.push({ resolve, reject });
                        })
                            .then((token) => {
                                originalRequest.headers[
                                    "Authorization"
                                ] = `Bearer ${token}`;
                                return axiosInstance(originalRequest);
                            })
                            .catch((err) => {
                                return Promise.reject(err);
                            });
                    }

                    originalRequest._retry = true;
                    isRefreshing = true;

                    try {
                        console.log("im here");

                        const response = await axiosInstance.post(
                            "/auth/test-re-generate-accesstoken",
                            {},
                            { withCredentials: true }
                        );
                        console.log("check response", response);
                        if (response.status === 201) {
                            const newAccessToken = response.data.accessToken;
                            console.log(
                                "check new access token",
                                newAccessToken
                            );

                            localStorage.setItem("accessToken", newAccessToken);
                            axiosInstance.defaults.headers.common[
                                "Authorization"
                            ] = `Bearer ${newAccessToken}`;
                            originalRequest.headers[
                                "Authorization"
                            ] = `Bearer ${newAccessToken}`;

                            processQueue(null, newAccessToken);
                            return axiosInstance(originalRequest);
                        }
                    } catch (refreshError: any) {
                        processQueue(refreshError, null);

                        if (
                            refreshError.response?.status === 401 &&
                            (refreshError.response?.data?.error ===
                                "INVALID_REFRESH_TOKEN" ||
                                refreshError.response?.data?.error ===
                                    "MISSING_REFRESH_TOKEN")
                        ) {
                            console.log(
                                "Refresh token is invalid or missing. Logging out..."
                            );
                            logout();
                            localStorage.removeItem("accessToken");
                            window.location.href = "/login";
                        }

                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                } else if (
                    errorData.error === "INVALID_REFRESH_TOKEN" ||
                    errorData.error === "MISSING_REFRESH_TOKEN"
                ) {
                    console.log(
                        "Refresh token is invalid or missing. Logging out..."
                    );
                    logout();
                    localStorage.removeItem("accessToken");
                    window.location.href = "/login";
                }
            }

            // For other types of errors, just reject the promise
            return Promise.reject(error);
        }
    );
}
