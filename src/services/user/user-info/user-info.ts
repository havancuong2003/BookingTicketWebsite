import axios from "axios";
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
        const response = await axiosInstance.post("/user/getInfo");
        console.log("response", response);

        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
};
