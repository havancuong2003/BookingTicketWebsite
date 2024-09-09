import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setupInterceptors } from "../../utils/";

// Create a new axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

// Setup interceptors
setupInterceptors(axiosInstance);

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

interface JwtPayload {
    email: string;
    firstName: string;
    lastName: string;
    sub: string; // User ID or similar identifier
}

interface UserInfo {
    email: string;
    firstName: string;
    lastName: string;
}

export const signUp = async (data: FormData) => {
    try {
        const response = await axiosInstance.post("/auth/signup", data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.message || "Email already exists"
            );
        }
        throw new Error("An error occurred during sign up");
    }
};

export const loginNormal = async (data: FormLogin) => {
    try {
        const response = await axiosInstance.post("/auth/login", data);
        console.log("Login response:", response?.data);
        return response?.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await axiosInstance.post("/auth/logout");
    } catch (error) {
        console.error("Logout failed", error);
        throw error;
    }
};

export const reFreshToken = async () => {
    try {
        const response = await axiosInstance.post("/auth/refresh-token");
        return response.data;
    } catch (error) {
        console.error("Refresh token failed", error);
        throw error;
    }
};

export const loginGG = async () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
};

export async function getAccessToken() {
    try {
        const response = await axiosInstance.get("/auth/token");
        return response.data;
    } catch (error) {
        console.error("Error fetching token:", error);
        throw error;
    }
}

const decodeJwtToken = (token: string): JwtPayload | null => {
    try {
        return jwtDecode<JwtPayload>(token);
    } catch (error) {
        console.error("Error decoding JWT token:", error);
        return null;
    }
};

const getGoogleUserInfo = async (token: string): Promise<UserInfo | null> => {
    try {
        const response = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            const userInfo = response.data;
            return {
                email: userInfo.email,
                firstName: userInfo.given_name,
                lastName: userInfo.family_name,
            };
        } else {
            console.error(
                "Failed to fetch user info from Google:",
                response.status,
                response.statusText
            );
            return null;
        }
    } catch (error) {
        console.error("Error fetching Google user info:", error);
        return null;
    }
};

export const userInfo = async (token: string): Promise<UserInfo | null> => {
    try {
        if (isJwtToken(token)) {
            // Nếu là JWT token
            const decoded = decodeJwtToken(token);
            if (decoded) {
                return {
                    email: decoded.email,
                    firstName: decoded.firstName,
                    lastName: decoded.lastName,
                };
            }
            console.error("Failed to decode JWT token");
            return null;
        } else if (isGoogleToken(token)) {
            // Nếu là Google token
            return await getGoogleUserInfo(token);
        } else {
            console.error("Unknown token type");
            return null;
        }
    } catch (error) {
        console.error(
            "Error determining token type or fetching user info:",
            error
        );
        return null;
    }
};

const isJwtToken = (token: string): boolean => {
    // JWT token thường có 3 phần (header.payload.signature), kiểm tra điều này
    return token.split(".").length === 3;
};

const isGoogleToken = (token: string): boolean => {
    // Google token thể có 2 phần (header.payload), kiểm tra điều này
    return token.startsWith("ya29");
};

export const checkAndSetToken = async () => {
    try {
        const response = await getAccessToken();
        if (response && response.accessToken) {
            localStorage.setItem("accessToken", response.accessToken);
            return response.accessToken;
        }
    } catch (error) {
        console.error("Error checking and setting token:", error);
    }
    return null;
};

export const verifyEmail = async (email: string, token: string) => {
    try {
        const response = await axiosInstance.post("/auth/verify-email", {
            email,
            token,
        });
        return response.data;
    } catch (error) {
        console.error("Error verifying email:", error);
        throw error;
    }
};

export const getTimeRemainingForVerification = async (email: string) => {
    try {
        const response = await axiosInstance.post(
            "/auth/time-remaining-verify",
            { email }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching remaining time:", error);
        throw error;
    }
};

export const resendVerificationEmail = async (email: string) => {
    try {
        const response = await axiosInstance.post(
            "/auth/send-verification-email",
            { email }
        );
        return response.data;
    } catch (error) {
        console.error("Error resending verification email:", error);
        throw error;
    }
};

export const requestResetPassword = async (email: string) => {
    try {
        const response = await axiosInstance.post(
            "/auth/request-reset-password",
            { email }
        );
        return response.data;
    } catch (error) {
        console.error("Error requesting password reset:", error);
        throw error;
    }
};

export const verifyResetToken = async (email: string, token: string) => {
    try {
        const response = await axiosInstance.post("/auth/verify-reset-token", {
            email,
            token,
        });
        return response;
    } catch (error) {
        console.error("Error verifying reset token:", error);
        throw error;
    }
};

export const getTimeRemainingForReset = async (email: string) => {
    try {
        const response = await axiosInstance.post(
            "/auth/time-remaining-reset-password",
            { email }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching remaining time for reset:", error);
        throw error;
    }
};

export const resetPassword = async (email: string, newPassword: string) => {
    try {
        const response = await axiosInstance.post("/auth/reset-password", {
            email,
            newPassword,
        });
        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};

export const getIdUser = async () => {
    try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            throw new Error("No access token found");
        }
        const response = await axiosInstance.post(`/auth/getInfor`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
};
