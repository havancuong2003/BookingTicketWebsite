// import { Navigate } from "react-router-dom";
// import { useAuth } from "../contexts";
// interface PrivateRouteProps {
//     children: React.ReactNode;
// }
// export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//     const { isAuthenticated } = useAuth();
//     console.log("isAuthenticated", isAuthenticated);

//     if (!isAuthenticated) {
//         return <Navigate to="/login" />;
//     }

//     return children;
// };
