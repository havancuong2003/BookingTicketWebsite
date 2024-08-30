import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts";
import { Layout } from "../layout";
import { Loading } from "../components";

interface PrivateRouteProps {
    children: React.ReactNode;
    roleUser: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roleUser }) => {
    const { isAuthenticated, role, fetchUserInfo } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await fetchUserInfo();
            } catch (error) {
                console.error("Error fetching user info:", error);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [fetchUserInfo, isAuthenticated, role, roleUser]);

    console.log("roleUser input", roleUser);
    console.log("role login", role);

    if (loading) {
        return (
            <div>
                <Layout>
                    <Loading />
                </Layout>
            </div>
        ); // Hoặc có thể là một spinner
    }

    console.log("isAuthenticated out", isAuthenticated);

    if (!isAuthenticated) {
        console.log("isAuthenticated in", isAuthenticated);
        return <Navigate to="/login" replace />;
    }

    if (roleUser !== role) {
        console.log("check 2 role", roleUser, role);

        console.log("role diff", isAuthenticated);
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
