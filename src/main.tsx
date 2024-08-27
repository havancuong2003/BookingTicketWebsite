import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    AddNewMovie,
    LandingPage,
    ListMovie,
    Login,
    Movie,
    Offer,
    Schedule,
    SignUp,
    Support,
    Voucher,
    ListCinema,
    AddNewCinema,
    UpdateCinema,
    AddNewRoom,
    ListRoom,
    UpdateRoom,
} from "./pages";
import { Layout } from "./layout";

import { AuthProvider } from "./contexts";
import { NotFound } from "./components";
import PrivateRoute from "./contexts/PrivateRoute";

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
            <Layout>
                <Voucher />
            </Layout>
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
            <Layout>
                <Support />
            </Layout>
        ),
    },
    {
        path: "/admin/addnewmovie",
        element: (
            <PrivateRoute>
                <AddNewMovie />
            </PrivateRoute>
        ),
    },
    {
        path: "/admin/listmovie",
        element: (
            <PrivateRoute>
                <ListMovie />
            </PrivateRoute>
        ),
    },

    {
        path: "/admin/cinema/addcinema",
        element: (
            <PrivateRoute>
                <AddNewCinema />
            </PrivateRoute>
        ),
    },

    {
        path: "/admin/cinema/listcinema",
        element: (
            <PrivateRoute>
                <ListCinema />
            </PrivateRoute>
        ),
    },
    {
        path: "/admin/cinema/details/:id",
        element: (
            <PrivateRoute>
                <UpdateCinema />
            </PrivateRoute>
        ),
    },
    {
        path: "/admin/room/addroom",
        element: (
            <PrivateRoute>
                <AddNewRoom />
            </PrivateRoute>
        ),
    },

    {
        path: "/admin/room/listroom",
        element: (
            <PrivateRoute>
                <ListRoom />
            </PrivateRoute>
        ),
    },
    {
        path: "/admin/room/details/:id",
        element: (
            <PrivateRoute>
                <UpdateRoom />
            </PrivateRoute>
        ),
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
