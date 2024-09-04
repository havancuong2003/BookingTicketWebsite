import axios, {
    AxiosInstance,
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";

let isRefreshing = false;
let failedQueue: any[] = [];

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

            if (error.response?.status === 401 && !originalRequest._retry) {
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
                    const response = await axiosInstance.post(
                        "/auth/test-re-generate-accesstoken",
                        {},
                        { withCredentials: true }
                    );
                    const newAccessToken = response.data.accessToken;
                    console.log("newAccessToken", newAccessToken);

                    localStorage.setItem("accessToken", newAccessToken);
                    axiosInstance.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;

                    processQueue(null, newAccessToken);
                    return axiosInstance(originalRequest);
                } catch (refreshError: any) {
                    processQueue(refreshError, null);

                    // Check if the refresh attempt itself returned a 401
                    if (refreshError.response?.status === 401) {
                        console.log(
                            "Refresh token is invalid or expired. Logging out..."
                        );
                        localStorage.removeItem("accessToken");
                        // You might want to remove other auth-related items from localStorage here

                        // Redirect to login page
                        window.location.href = "/login";
                    }
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
}
