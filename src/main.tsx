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
    ListCinema,
    UpdateCinema,
    AddNewRoom,
    ListRoom,
    UpdateRoom,
} from "./pages";
import { Layout } from "./layout";
import { AuthProvider } from "./contexts";

import { NotFound } from "./components";
import PrivateRoute from "./routes/privateRoutes";
import "./index.css";
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
