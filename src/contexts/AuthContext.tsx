import React, { createContext, useState, useContext, useEffect } from "react";

// Tạo AuthContext
interface AuthContextProps {
    userName: string;
    accessToken: string | null;
    isAuthenticated: boolean;
    setUserName: (name: string) => void;
    setAccessToken: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [userName, setUserName] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem("accessToken")
    );

    const isAuthenticated = !!accessToken;

    // useEffect(() => {
    //     if (accessToken) {
    //         const fetchUserInfo = async () => {
    //             try {
    //                 const response = await fetch(
    //                     "https://www.googleapis.com/oauth2/v3/userinfo",
    //                     {
    //                         headers: {
    //                             Authorization: `Bearer ${accessToken}`,
    //                         },
    //                     }
    //                 );

    //                 if (response.ok) {
    //                     const userInfo = await response.json();
    //                     setUserName(userInfo.name);
    //                 } else {
    //                     console.error(
    //                         "Failed to fetch user info:",
    //                         await response.text()
    //                     );
    //                 }
    //             } catch (error) {
    //                 console.error("Error fetching user info:", error);
    //             }
    //         };

    //         fetchUserInfo();
    //     }
    // }, [accessToken]);

    const logout = () => {
        setUserName("");
        setAccessToken(null);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider
            value={{
                userName,
                accessToken,
                isAuthenticated,
                setUserName,
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
