import axios from "axios";
import { jwtDecode } from "jwt-decode";
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
            `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        console.log("response herre", response);
        return response?.data?.user;
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

export async function getAccessToken() {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/auth/token`,
            {
                withCredentials: true, // Gửi cookies và session
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching token:", error);
        throw error; // Hoặc xử lý lỗi theo cách bạn muốn
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
