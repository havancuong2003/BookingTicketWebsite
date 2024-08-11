import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "./components/commons/header/header.tsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
    },
    {
        path: "/test",
        element: <div>abcd test</div>,
    },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
