import React, { createContext, useState, useContext } from "react";

// Tạo AuthContext
interface AuthContextProps {
    accessToken: string | null;
    isAuthenticated: boolean;
    setAccessToken: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem("accessToken")
    );

    const isAuthenticated =
        accessToken && accessToken !== "null" ? true : false;

    const logout = () => {
        setAccessToken(null);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                isAuthenticated,
                setAccessToken,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook để sử dụng AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
