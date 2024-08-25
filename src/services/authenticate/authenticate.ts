import axios from "axios";
import { useEffect } from "react";

type FormData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

type FormLogin = {
    email: string;
    password: string;
};
export const signUp = async (data: FormData) => {
    console.log("data", data);
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/user/register`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};

export const login = async (data: FormLogin) => {
    console.log("data", data);
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/user/login`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("response", response);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data.message);
            console.error("err", error.response?.data);
        }
        console.error(error);
    }
};

export const loginGG = async () => {
    try {
        window.location.href = `${
            import.meta.env.VITE_BACKEND_URL
        }/auth/google`;
    } catch (error) {
        console.error("Login Failed:", error);
    }
};
