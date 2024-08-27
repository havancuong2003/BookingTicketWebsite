import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface WithAuthProps {
    role: string; // Vai trò cần kiểm tra
}

export const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    { role }: WithAuthProps
) => {
    const ComponentWithAuth: React.FC<P> = (props) => {
        const { isAuthenticated, role: userRole } = useAuth();
        const navigate = useNavigate();
        console.log("isAuthenticated", isAuthenticated);

        React.useEffect(() => {
            if (!isAuthenticated) {
                navigate("/login");
            } else if (userRole !== role) {
                navigate("/");
            }
        }, [isAuthenticated, userRole, role, navigate]);

        if (!isAuthenticated || userRole !== role) {
            return null; // Hoặc có thể hiển thị một loader trong thời gian chờ điều hướng
        }

        return <WrappedComponent {...props} />;
    };

    return ComponentWithAuth;
};
