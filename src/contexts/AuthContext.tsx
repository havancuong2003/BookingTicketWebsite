import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";
import { login as apiLogin, getAccessToken, userInfo } from "../services";

type FormLogin = {
    email: string;
    password: string;
};

interface AuthContextProps {
    accessToken: string | null;
    isAuthenticated: boolean;
    role: string | null;
    userName: string | null;
    userId: number | null;
    email: string | null;
    setAccessToken: (token: string) => void;
    setRole: (role: string) => void;
    setUserName: (name: string) => void;
    setUserId: (userId: number) => void;
    setEmail: (name: string) => void;
    logout: () => void;
    login: (data: FormLogin, navigate: any) => Promise<void>;
    fetchUserInfo: () => Promise<void>;
    isLoading: boolean; // Thêm trạng thái đang tải
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(null);
    const [role, setRoleState] = useState<string | null>(null);
    const [userName, setUserNameState] = useState<string | null>(null);
    const [userId, setUserIdState] = useState<number | null>(null);
    const [email, setEmailState] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Thêm trạng thái đang tải

    const fetchUserInfo = async () => {
        try {
            const tokenData = await getAccessToken();
            const { accessToken, role } = tokenData;
            setAccessTokenState(accessToken);
            setRoleState(role);
            setIsAuthenticated(Boolean(accessToken)); // Cập nhật isAuthenticated

            if (accessToken) {
                const user = await userInfo(accessToken);
                setUserNameState(user?.firstName || null);
                setEmailState(user?.email || null);
                setUserIdState(user?.userId || null);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            setIsAuthenticated(false); // Đảm bảo trạng thái xác thực không đúng nếu có lỗi
        } finally {
            setIsLoading(false); // Đánh dấu dữ liệu đã được tải xong
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const setAccessToken = (token: string) => {
        setAccessTokenState(token);
        setIsAuthenticated(Boolean(token)); // Cập nhật isAuthenticated khi accessToken thay đổi
    };

    const setRole = (role: string) => {
        setRoleState(role);
    };

    const setUserName = (name: string) => {
        setUserNameState(name);
    };
    const setUserId = (userId: number) => {
        setUserIdState(userId);
    };
    const setEmail = (email: string) => {
        setEmailState(email);
    };

    const logout = () => {
        setAccessTokenState(null);
        setRoleState(null);
        setUserNameState(null);
        setUserIdState(null);
        setEmailState(null);
        setIsAuthenticated(false); // Đảm bảo trạng thái xác thực bị gỡ bỏ khi logout
    };

    const login = async (data: FormLogin, navigate: any) => {
        try {
            await apiLogin(data);
            await fetchUserInfo();
            navigate("/");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                isAuthenticated,
                role,
                userName,
                userId,
                email,
                setAccessToken,
                setRole,
                setUserName,
                setUserId,
                setEmail,
                logout,
                login,
                fetchUserInfo,
                isLoading, // Cung cấp trạng thái đang tải
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
