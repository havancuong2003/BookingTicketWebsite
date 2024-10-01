import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setupInterceptors } from "../../../utils";

// Create a new axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

// Setup interceptors
setupInterceptors(axiosInstance);

export const getUserInfo = async () => {
    try {
        const response = await axiosInstance.get("/user/info");
        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
};
