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
    VerifyEmail,
    ListCinema,
    UpdateCinema,
    AddNewRoom,
    ListRoom,
    UpdateRoom,
    AddNewCinema,
} from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import { AddNewScreening } from "./pages/admin/screening-control";
import { ListScreening } from "./pages/admin/screening-control/list-screening/list-screening";
import { ChooseChair } from "./pages/user/choose-chair/choose-chair";
import { ResetPasswordPage } from "./pages/user/reset-password/reset-password";
import { PaymentSuccess } from "./pages/common/payment/payment_success";

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
        path: "verify-email",
        element: <VerifyEmail />,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />,
    },

    {
        path: "/admin/cinema/listcinema",
        element: (
            <Layout>
                <ListCinema />
            </Layout>
        ),
    },
    {
        path: "/admin/cinema/addcinema",
        element: (
            <Layout>
                <AddNewCinema />
            </Layout>
        ),
    },
    {
        path: "/admin/cinema/details/:id",
        element: (
            <Layout>
                <UpdateCinema />
            </Layout>
        ),
    },
    {
        path: "/admin/room/addroom/:cinemaId",
        element: (
            <Layout>
                <AddNewRoom />
            </Layout>
        ),
    },

    {
        path: "/admin/room/listroom/:cinemaId",
        element: (
            <Layout>
                <ListRoom />
            </Layout>
        ),
    },
    {
        path: "/admin/room/details/:id",
        element: (
            <Layout>
                <UpdateRoom />
            </Layout>
        ),
    },
    {
        path: "/admin/screening/addscreening/:roomId",
        element: (
            <Layout>
                <AddNewScreening />
            </Layout>
        ),
    },
    {
        path: "/admin/screening/listscreening/:roomId",
        element: (
            <Layout>
                <ListScreening />
            </Layout>
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
        path: "/choosechair/:idScreening",
        element: (
            <Layout>
                <ChooseChair />
            </Layout>
        ),
    },
    {
        path: "order/vnpay_return/*",
        element: (
            <Layout>
                <PaymentSuccess />
            </Layout>
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
