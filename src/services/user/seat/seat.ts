import axios from "axios";

export const chooseChair = async (id: any) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/choosechair/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateStatusSeat = async (id: any, data: any) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/seat/updatestatus/${id}`,
            data
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
