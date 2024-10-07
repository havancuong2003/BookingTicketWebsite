import { useState, useCallback, useEffect } from "react";
import {
    loginNormal,
    loginGG,
    userInfo,
    logout as logoutService,
    checkAndSetToken,
    signUp,
} from "../services";
import axios from "axios";

type FormData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export const useAuthState = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<{
        email: string;
        firstName: string;
        lastName: string;
    } | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem("accessToken")
    );
    const [loginError, setLoginError] = useState<string | null>(null);

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
                const data = await loginNormal({ email, password });

                if (data.statusCode === 200 && data.accessToken) {
                    await handleLoginSuccess(data.accessToken);
                    return { success: true, user: data.user };
                } else if (
                    data.statusCode === 403 &&
                    data.requireEmailVerification
                ) {
                    setLoginError("Email not verified");
                    return {
                        success: false,
                        error: "Email not verified",
                        requireEmailVerification: true,
                        email: data.email,
                    };
                } else if (
                    data.statusCode === 401 &&
                    data.message === "Password not set"
                ) {
                    return {
                        success: false,
                        error: "Password not set",
                        requirePasswordReset: true,
                        email: data.email,
                    };
                } else {
                    setLoginError(data.message);
                    return { success: false, error: data.message };
                }
            } catch (error) {
                console.error("Login failed:", error);
                handleLoginFailure();
                if (axios.isAxiosError(error) && error.response) {
                    const errorData = error.response.data;
                    setLoginError(errorData.message);
                    return { success: false, error: errorData.message };
                }
                setLoginError("An unexpected error occurred");
                return {
                    success: false,
                    error: "An unexpected error occurred",
                };
            }
        },
        [handleLoginSuccess, handleLoginFailure]
    );

    const handleSignUp = async (data: FormData) => {
        try {
            const response = await signUp(data);
            console.log("Sign up successful", response);
            return { success: true };
        } catch (error) {
            console.error("Sign up failed:", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            };
        }
    };

    const loginWithGoogle = useCallback(() => {
        loginGG();
    }, []);

    const logout = useCallback(async () => {
        try {
            await logoutService();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("lastLoginEmail");
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
        handleSignUp,
        loginError,
        setLoginError,
    };
};
