import { AxiosInstance } from "axios";

export function setupInterceptors(axiosInstance: AxiosInstance) {
    // Request interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const response = await axiosInstance.post(
                        "/auth/refresh-token"
                    );
                    const newAccessToken = response.data.accessToken;

                    localStorage.setItem("accessToken", newAccessToken);
                    axiosInstance.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;

                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    // Handle refresh token error (e.g., logout user)
                    localStorage.removeItem("accessToken");
                    // Redirect to login page or dispatch a logout action
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
}
