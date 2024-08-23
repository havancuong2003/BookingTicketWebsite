import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
