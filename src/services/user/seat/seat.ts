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
export const bookingChair = async (id: any) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/choosechair/booking/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateStatusSeat = async (id: any, data: any) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/booking/updatestatus/${id}`,
            data
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteSeatChoose = async (userId: any, seatId: any) => {
    try {
        const response = await axios.delete(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/booking/deleteSeatChooseByUserId/${userId}/${seatId}`
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
            }/booking/findSeatsByUserId/${idScreening}`
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
            }/booking/findSeatsDoneByUserId/${idScreening}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
export const updateSeatsByUserToDefault = async (userId: any) => {
    try {
        const response = await axios.delete(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/booking/updateStatusByUserIdToDefault/${userId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
export const findSeatsBookingByUserId = async (userId: any) => {
    try {
        const response = await axios.get(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/booking/findSeatsBookingByUserId/${userId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
export const updateSeatsDoneByUserId = async (userId: any) => {
    try {
        const response = await axios.put(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/booking/updateSeatsDoneByUserId/${userId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
export const findSeatsAndTypeSeatBookingByUserId = async (userId: any) => {
    try {
        const response = await axios.get(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/booking/findSeatsAndTypeSeatBookingByUserId/${userId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
