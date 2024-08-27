// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import Cookies from "js-cookie";

// Định nghĩa kiểu dữ liệu cho AuthContext
interface AuthContextProps {
    accessToken: string | null;
    isAuthenticated: boolean;
    role: string | null;
    setAccessToken: (token: string) => void;
    setRole: (role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem("accessToken")
    );
    const [role, setRole] = useState<string | null>(
        Cookies.get("role") || null
    );

    const isAuthenticated = (accessToken && accessToken !== "null") || false;

    const logout = () => {
        setAccessToken(null);
        setRole(null);
        localStorage.removeItem("accessToken");
        Cookies.remove("role");
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                isAuthenticated,
                role,
                setAccessToken,
                setRole,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
