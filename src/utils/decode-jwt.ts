import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    email: string;
    firstName: string;
    lastName: string;
    sub: string;
}

export const getUserInfoFromToken = (): JwtPayload | null => {
    try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("No token found");
            return null;
        }

        // Giải mã token
        const decodedToken = jwtDecode<JwtPayload>(token);
        console.log("Decoded token:", decodedToken);
        return decodedToken;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

// Example usage
