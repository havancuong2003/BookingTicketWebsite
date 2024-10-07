import axios from "axios";
import { setupInterceptors } from "../../../utils/";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

setupInterceptors(axiosInstance);

// Hàm lấy danh sách món ăn
export const getMenuItems = async () => {
    try {
        const response = await axiosInstance.get("/menu/item");
        return response.data;
    } catch (error) {
        console.error("Error fetching menu items:", error);
        throw error; // Ném lỗi để component gọi API có thể xử lý
    }
};

// Hàm thêm món ăn
export const addMenuItem = async (menuData: any) => {
    try {
        const response = await axiosInstance.post("/menu/item", menuData);
        return response.data;
    } catch (error) {
        console.error("Error adding menu item:", error);
        throw error; // Ném lỗi để component gọi API có thể xử lý
    }
};

// Hàm cập nhật thông tin món ăn
export const updateMenuItem = async (id: number, menuData: any) => {
    try {
        const response = await axiosInstance.put(`/menu/item/${id}`, menuData);
        return response.data;
    } catch (error) {
        console.error("Error updating menu item:", error);
        throw error; // Ném lỗi để component gọi API có thể xử lý
    }
};

// Hàm xóa món ăn
export const deleteMenuItem = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/menu/item/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting menu item:", error);
        throw error; // Ném lỗi để component gọi API có thể xử lý
    }
};

// Hàm lấy danh sách combo
export const getCombos = async () => {
    try {
        const response = await axiosInstance.get("/menu/combo");
        return response.data;
    } catch (error) {
        console.error("Error fetching combos:", error);
        throw error; // Ném lỗi để component gọi API có thể xử lý
    }
};

// Hàm thêm combo
export const addCombo = async (comboData: any) => {
    try {
        const response = await axiosInstance.post("/menu/combo", comboData);
        return response.data;
    } catch (error) {
        console.error("Error adding combo:", error);
        throw error; // Ném lỗi để component gọi API có thể xử lý
    }
};

// Hàm cập nhật combo
export const updateCombo = async (id: number, comboData: any) => {
    try {
        const response = await axiosInstance.put(
            `/menu/combo/${id}`,
            comboData
        );
        return response.data;
    } catch (error) {
        console.error("Error updating combo:", error);
        throw error; // Ném lỗi để component gọi API có thể xử lý
    }
};

// Hàm xóa combo
export const deleteCombo = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/menu/combo/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting combo:", error);
        throw error; // Ném lỗi để component gọi API có thể xử lý
    }
};
