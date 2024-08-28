import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts";
import { Loading } from "../components";

interface PrivateRouteProps {
    children: React.ReactNode;
    roleUser: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roleUser }) => {
    const { isAuthenticated, role, fetchUserInfo } = useAuth();
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // Để kiểm tra trạng thái khi điều hướng

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await fetchUserInfo();
                console.log("fetch");
            } catch (error) {
                console.error("Error fetching user info:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };
        checkAuth();
    }, [fetchUserInfo, location.pathname, role, isAuthenticated]);

    if (loading) {
        // Không hiển thị gì khi đang loading
        return <Loading />;
    }

    if (!isAuthenticated) {
        console.log("chet roi");

        return <Navigate to="/login" replace />;
    }

    if (roleUser !== role) {
        console.log("role diff");

        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
