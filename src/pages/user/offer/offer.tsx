import { useState } from "react";
import axios from "axios";
import { setupInterceptors } from "../../../utils/axios-inteceptors";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

setupInterceptors(axiosInstance);

export const Offer = () => {
    const [message, setMessage] = useState("");

    const handleTestAuth = async () => {
        try {
            const response = await axiosInstance.get("/auth/test-auth");
            setMessage(response.data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(
                    "Error: " +
                        (error.response?.data?.message || "Unknown error")
                );
            } else {
                setMessage("Error: Unknown error");
            }
        }
    };

    const handleRefreshToken = async () => {
        try {
            const response = await axiosInstance.post(
                "/auth/test-re-generate-accesstoken"
            );
            setMessage(response.data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(
                    "Error: " +
                        (error.response?.data?.message || "Unknown error")
                );
            } else {
                setMessage("Error: Unknown error");
            }
        }
    };

    const handleCheckTimeRefreshToken = async () => {
        try {
            const response = await axiosInstance.post(
                "/auth/check-refresh-token-expiration"
            );
            console.log(response);
            setMessage(
                response.data.message + " " + response.data.timeRemaining
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(
                    "Error: " +
                        (error.response?.data?.message || "Unknown error")
                );
            } else {
                setMessage("Error: Unknown error");
            }
        }
    };

    return (
        <div className="mt-10 flex flex-col gap-5">
            <button onClick={handleTestAuth}>Test Auth</button>
            <br />
            <button onClick={handleRefreshToken}>Refresh Token</button>
            <br />
            <button onClick={handleCheckTimeRefreshToken}>
                Check time refresh token
            </button>
            <p>{message}</p>
        </div>
    );
};
