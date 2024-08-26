import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Cinema = {
    id: number;
    name: string;
    location: string;
    totalScreens: number;
    createdAt: String;
    updatedAt: String;
};
export const ListCinema = () => {
    const [cinemas, setCinemas] = useState<Cinema[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/cinema/getAll`
                );
                setCinemas(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    console.log("cinema:", cinemas);

    return (
        <div>
            {cinemas.map((cinema) => (
                <div
                    key={cinema.id}
                    style={{
                        display: "flex",
                        marginBottom: "20px",
                        padding: "10px",
                    }}
                >
                    <div style={{ flex: 1, paddingRight: "20px" }}>
                        <h2>{cinema.name}</h2>
                        <p>
                            <strong>Location:</strong> {cinema.location}
                        </p>
                        <p>
                            <strong>Total screens:</strong>{" "}
                            {cinema.totalScreens}
                        </p>
                        <p>
                            <strong>Create At:</strong> {cinema.createdAt}
                        </p>
                        <p>
                            <strong>Update At:</strong> {cinema.updatedAt}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
