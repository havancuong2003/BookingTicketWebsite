import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    AddNewMovie,
    Dashboard,
    LandingPage,
    ListMovie,
    Login,
    Movie,
    Offer,
    Schedule,
    SignUp,
    Support,
    Voucher,
} from "./pages";
import { Layout } from "./layout";
import { AuthProvider } from "./contexts";

import { NotFound } from "./components";
import PrivateRoute from "./routes/privateRoutes";
import "./index.css";
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
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
