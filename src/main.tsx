import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout";
import { AuthProvider } from "./contexts";
import { Loading, NotFound } from "./components";
import PrivateRoute from "./routes/privateRoutes";
import "./index.css";
import { wait } from "./utils/wait";

// Lazy-loaded components
const AddNewMovie = lazy(() =>
    wait(500).then(() =>
        import("./pages").then((module) => ({ default: module.AddNewMovie }))
    )
);
const LandingPage = lazy(() =>
    wait(500).then(() =>
        import("./pages").then((module) => ({ default: module.LandingPage }))
    )
);
const ListMovie = lazy(() =>
    wait(500).then(() =>
        import("./pages").then((module) => ({ default: module.ListMovie }))
    )
);
const Login = lazy(() =>
    wait(0).then(() =>
        import("./pages").then((module) => ({ default: module.Login }))
    )
);
const Movie = lazy(() =>
    wait(500).then(() =>
        import("./pages").then((module) => ({ default: module.Movie }))
    )
);
const Offer = lazy(() =>
    wait(500).then(() =>
        import("./pages").then((module) => ({ default: module.Offer }))
    )
);
const Schedule = lazy(() =>
    wait(500).then(() =>
        import("./pages").then((module) => ({ default: module.Schedule }))
    )
);
const SignUp = lazy(() =>
    wait(0).then(() =>
        import("./pages").then((module) => ({ default: module.SignUp }))
    )
);
const Support = lazy(() =>
    wait(500).then(() =>
        import("./pages").then((module) => ({ default: module.Support }))
    )
);
const Voucher = lazy(() =>
    wait(500).then(() =>
        import("./pages").then((module) => ({ default: module.Voucher }))
    )
);
const Dashboard = lazy(() =>
    wait(500).then(() =>
        import("./pages").then((module) => ({ default: module.Dashboard }))
    )
);

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout>
                <LandingPage />
            </Layout>
        ),
    },
    {
        path: "/movie",
        element: (
            <Layout>
                <Movie />
            </Layout>
        ),
    },
    {
        path: "/schedule",
        element: (
            <Layout>
                <Schedule />
            </Layout>
        ),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/voucher",
        element: (
            <PrivateRoute roleUser="user">
                <Layout>
                    <Voucher />
                </Layout>
            </PrivateRoute>
        ),
    },
    {
        path: "/offer",
        element: (
            <Layout>
                <Offer />
            </Layout>
        ),
    },
    {
        path: "/support",
        element: (
            <PrivateRoute roleUser="user">
                <Layout>
                    <Support />
                </Layout>
            </PrivateRoute>
        ),
    },
    {
        path: "/admin/addnewmovie",
        element: (
            <PrivateRoute roleUser="admin">
                <Layout>
                    <AddNewMovie />
                </Layout>
            </PrivateRoute>
        ),
    },
    {
        path: "/admin/listmovie",
        element: (
            <PrivateRoute roleUser="admin">
                <Layout>
                    <ListMovie />
                </Layout>
            </PrivateRoute>
        ),
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <Suspense fallback={<Loading />}>
                <RouterProvider router={router} />
            </Suspense>
        </AuthProvider>
    </React.StrictMode>
);
