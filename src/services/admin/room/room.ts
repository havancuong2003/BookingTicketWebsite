import axios from "axios";

export const listRoom = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/room/getAll`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
export const createRoom = async (data: any, navigate: any) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/room/create`,
            data
        );
        console.log("Room added successfully:", response.data);
        navigate("/admin/room/listroom");
    } catch (error) {
        console.log(data);
        console.error("Error adding room:", error, data);
    }
};
export const updateRoom = async (data: any, id: any, navigate: any) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/room/update/${id}`,
            data
        );
        console.log("room updated successfully:", response.data);
        navigate("/admin/room/listroom");
    } catch (error) {
        console.log(data);
        console.error("Error updated room:", error, data);
    }
};
export const detailRoom = async (id: any) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/room/details/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
