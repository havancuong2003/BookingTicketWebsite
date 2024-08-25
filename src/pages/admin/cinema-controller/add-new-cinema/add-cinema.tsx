import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddCinemaForm() {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        totalScreens: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Type the change event for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Type the submit event for form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");
        const navigate = useNavigate();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/cinema/create`,
                formData
            );
            console.log("Movie added successfully:", response.data);
            navigate("/admin/listmovie");

            if (!response.data.ok) {
                throw new Error("Failed to create cinema");
            }

            // Handle success
            setFormData({
                name: "",
                location: "",
                totalScreens: "",
            });
            alert("Cinema created successfully!");
        } catch (erro) {
            if (erro instanceof Error) {
                setErrorMessage(erro.message);
            } else {
                setErrorMessage("An unknown error occurred");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Cinema Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="totalScreens">Total Screens:</label>
                <input
                    type="number"
                    id="totalScreens"
                    name="totalScreens"
                    value={formData.totalScreens}
                    onChange={handleChange}
                    required
                />
            </div>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Add Cinema"}
            </button>
        </form>
    );
}
