import axios from "axios";
import { setupInterceptors } from "../../utils/";

// Create a new axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

// Setup interceptors
setupInterceptors(axiosInstance);

export const getMoviesAPI = async () => {
    const response = await axiosInstance.get("/movie/getall");
    console.log("response", response);
    return response.data;
};
