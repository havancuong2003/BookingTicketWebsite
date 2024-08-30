import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout";
import { NotFound } from "./components";
import "./index.css";

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
    Dashboard,
    ListCinema,
    UpdateCinema,
    AddNewRoom,
    ListRoom,
    UpdateRoom,
} from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import { AddNewScreening } from "./pages/admin/screening-control";
import { ListScreening } from "./pages/admin/screening-control/list-screening/list-screening";
import { ChooseChair } from "./pages/user/choose-chair/choose-chair";

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
            <Layout>
                <AddNewMovie />
            </Layout>
        ),
    },
    {
        path: "/admin/listmovie",
        element: (
            <Layout>
                <ListMovie />
            </Layout>
        ),
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },

    {
        path: "/admin/cinema/listcinema",
        element: (
            // <PrivateRoute>
            <ListCinema />
            // </PrivateRoute>
        ),
    },
    {
        path: "/admin/cinema/details/:id",
        element: (
            // <PrivateRoute>
            <UpdateCinema />
            // </PrivateRoute>
        ),
    },
    {
        path: "/admin/room/addroom",
        element: (
            // <PrivateRoute>
            <AddNewRoom />
            // </PrivateRoute>
        ),
    },

    {
        path: "/admin/room/listroom",
        element: (
            // <PrivateRoute>
            <ListRoom />
            // {/* // </PrivateRoute> */}
        ),
    },
    {
        path: "/admin/room/details/:id",
        element: (
            // <PrivateRoute>
            <UpdateRoom />
            // </PrivateRoute>
        ),
    },
    {
        path: "/admin/screening/addscreening",
        element: (
            // <PrivateRoute>
            <AddNewScreening />
            // </PrivateRoute>
        ),
    },
    {
        path: "/admin/screening/listscreening",
        element: (
            // <PrivateRoute>
            <ListScreening />
            // </PrivateRoute>
        ),
    },
    // {
    //     path: "/admin/screening/details/:id",
    //     element: (
    //         <PrivateRoute>
    //         <UpdateScreening />
    //         </PrivateRoute>
    //     ),
    // },

    {
        path: "/choosechair",
        element: (
            // <PrivateRoute>
            <ChooseChair />
            // </PrivateRoute>
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
