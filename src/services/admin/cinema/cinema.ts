import axios from "axios";

export const listCinema = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/cinema/getAll`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createCinema = async (data: any, navigate: any) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/cinema/create`,
            data
        );
        console.log("Cinema added successfully:", response.data);
        navigate("/admin/cinema/listcinema");
    } catch (error) {
        console.log(data);
        console.error("Error adding cinema:", error, data);
    }
};

export const detailCinema = async (id: any) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/cinema/details/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateCinema = async (id: any, data: any, navigate: any) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/cinema/update/${id}`,
            data
        );
        console.log("Cinema updated successfully:", response.data);
        navigate("/admin/cinema/listcinema");
    } catch (error) {
        console.log(data);
        console.error("Error updated cinema:", error, data);
    }
};
