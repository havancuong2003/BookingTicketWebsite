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
export const getAllSeatByUser = async (idScreening: any) => {
    try {
        const response = await axios.get(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/seat/findSeatsByUserId/${idScreening}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
export const getAllSeatDoneByUser = async (idScreening: any) => {
    try {
        const response = await axios.get(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/seat/findSeatsDoneByUserId/${idScreening}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
export const updateSeatsByUserToDefault = async (userId: any) => {
    try {
        const response = await axios.put(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/seat/updateStatusByUserIdToDefault/${userId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
