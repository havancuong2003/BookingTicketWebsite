import axios from "axios";

export const createVNPay = async (
    amount: number,
    orderInfo: string
): Promise<string | null> => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/vnpay/create-payment-url`,
            {
                amount,
                orderInfo,
            }
        );

        if (response.data && response.data.url) {
            return response.data.url;
        } else {
            console.error("Payment URL not found in the response");
            return null;
        }
    } catch (error) {
        console.error("Error while creating payment URL:", error);
        return null;
    }
};

export const returnVNPay = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = Object.fromEntries(urlParams.entries());
    console.log("Query:", query);
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/vnpay/vnpay_return`,
            {
                params: query,
            }
        );
        console.log("Response:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("There was an error making the request:", error);
        return null;
    }
};
