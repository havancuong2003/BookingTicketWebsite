import axios from "axios";

export const createNewPayment = async (paymentData: any) => {
    try {
        const payment = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/payment`,
            paymentData
        );
        console.log("sdfasdfasdfsadfasf:", payment.data);

        return payment.data;
    } catch (error) {
        console.error("Error adding cinema:", error, paymentData);
    }
};
export const getPaymentByPaymentId = async (paymentId: any) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/payment/${paymentId}`
        );
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
export const updatePayment = async (paymentId: any) => {
    try {
        const payment = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/payment/${paymentId}`
        );
        return payment.data;
    } catch (error) {
        console.error("Error adding cinema:", error);
    }
};
export const sendPaymentSuccess = async (paymentId: any) => {
    try {
        const response = await axios.post(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/auth/send-email-payment-success/${paymentId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error sending payment success:", error);
    }
};
