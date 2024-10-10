import axios from "axios";

export const getInforBookingComboByPaymentId = async (paymentId: any) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/bookingcombo/${paymentId}`
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
