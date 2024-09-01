import { useState, useCallback, useEffect } from "react";
import {
    loginNormal,
    loginGG,
    userInfo,
    logout as logoutService,
    checkAndSetToken,
    signUp,
} from "../services/authenticate/authenticate";
type FormData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

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
                const response = await loginNormal({ email, password });
                console.log("check response 0", response);
                if (response.statusCode === 403) {
                    console.log("check response", response);
                    setLoginError("Email is not verified");
                    return {
                        success: false,
                        error: "Email is not verified",
                        email,
                    };
                } else if (response && response.accessToken) {
                    console.log("check response 2", response);
                    await handleLoginSuccess(response.accessToken);
                    return { success: true };
                }
                throw new Error("Login failed");
            } catch (error) {
                console.error("Normal login failed:", error);
                handleLoginFailure();
                return { error: "Login failed" };
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
        handleSignUp,
        loginError,
        setLoginError,
    };
};

export default useAuthState;
