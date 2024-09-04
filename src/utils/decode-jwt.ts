import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    iat: number; // Issued at
    exp: number; // Expiration time
    // Add any other fields that your JWT might contain
}

interface UserInfo {
    email: string;
    firstName: string;
    id: number;
    role: string;
}

export function decodeAccessToken(token: string): UserInfo | null {
    try {
        const decoded = jwtDecode<JwtPayload>(token);

        return {
            email: decoded.email,
            firstName: decoded.firstName,
            id: Number(decoded.id),
            role: decoded.role,
        };
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
}

export function isTokenExpired(token: string): boolean {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        return decoded.exp < currentTime;
    } catch (error) {
        console.error("Error checking token expiration:", error);
        return true; // Assume expired if there's an error
    }
}

export function getTokenExpirationTime(token: string): Date | null {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return new Date(decoded.exp * 1000); // Convert seconds to milliseconds
    } catch (error) {
        console.error("Error getting token expiration time:", error);
        return null;
    }
}
