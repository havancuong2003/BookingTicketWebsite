import React from "react";
import { Header, Footer } from "../components";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Header />
            <div style={{ flex: "1 0 auto" }}>{children}</div>
            <Footer />
        </div>
    );
};
