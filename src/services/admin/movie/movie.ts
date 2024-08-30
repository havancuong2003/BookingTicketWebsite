import axios from "axios";
import { setupInterceptors } from "../../../utils/";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

setupInterceptors(axiosInstance);

export const getIDMovieAfterUpload = async (formData: FormData) => {
    try {
        const response = await axiosInstance.post("/auth/upload", formData);
        return response.data;
    } catch (error) {
        console.error("Error uploading video:", error);
        throw error; // Ném lỗi để component gọi API có thể xử lý
    }
};

export const createMovie = async (movieData: any, navigate: any) => {
    try {
        const response = await axiosInstance.post("/movie/create", movieData);
        console.log("Movie added successfully:", response.data);
        navigate("/admin/listmovie");
        return response.data;
    } catch (error) {
        console.error("Error adding movie:", error);
        throw error;
    }
};

export const listMovie = async () => {
    try {
        const response = await axiosInstance.get("/movie/getAll");
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};
