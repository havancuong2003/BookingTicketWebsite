import { useState, useCallback, useEffect } from "react";
import {
    loginNormal,
    loginGG,
    userInfo,
    logout as logoutService,
    checkAndSetToken,
} from "../services/authenticate/authenticate";

const useAuthState = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<{
        email: string;
        firstName: string;
        lastName: string;
    } | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem("accessToken")
    );

    const handleLoginSuccess = useCallback(async (token: string) => {
        setAccessToken(token);
        localStorage.setItem("accessToken", token);
        setIsAuthenticated(true);
        const userInformation = await userInfo(token);
        if (userInformation) {
            setUser(userInformation);
        }
    }, []);

    const handleLoginFailure = useCallback(() => {
        setIsAuthenticated(false);
        setUser(null);
        setAccessToken(null);
    }, []);

    const loginWithCredentials = useCallback(
        async (email: string, password: string) => {
            try {
                const response = await loginNormal({ email, password });
                if (response && response.accessToken) {
                    await handleLoginSuccess(response.accessToken);
                }
            } catch (error) {
                console.error("Normal login failed:", error);
                handleLoginFailure();
            }
        },
        [handleLoginSuccess, handleLoginFailure]
    );

    const loginWithGoogle = useCallback(() => {
        loginGG(); // This will redirect to Google login
    }, []);

    const logout = useCallback(async () => {
        try {
            await logoutService();
            localStorage.removeItem("accessToken");
            handleLoginFailure();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, [handleLoginFailure]);

    useEffect(() => {
        const initAuth = async () => {
            const token = await checkAndSetToken();
            if (token) {
                await handleLoginSuccess(token);
            } else {
                handleLoginFailure();
            }
        };

        initAuth();
    }, [handleLoginSuccess, handleLoginFailure]);

    return {
        isAuthenticated,
        user,
        accessToken,
        loginWithCredentials,
        loginWithGoogle,
        logout,
    };
};

export default useAuthState;
