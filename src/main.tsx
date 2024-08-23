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
} from "./pages";
import { Layout } from "./layout";
import NotFound from "./components/commons/not-found";

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
        element: <AddNewMovie />,
    },
    {
        path: "/admin/listmovie",
        element: <ListMovie />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
