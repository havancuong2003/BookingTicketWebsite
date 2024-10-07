import axios from "axios";

export const createNewPaymentDetail = async (data: any) => {
    try {
        await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/paymentdetail`,
            data
        );
    } catch (error) {
        console.error("Error adding cinema:", error, data);
    }
};
export const getPaymentDetailByPaymentId = async (paymentId: any) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/paymentdetail/${paymentId}`
        );
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
