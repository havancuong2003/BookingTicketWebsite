import { useEffect, useState } from "react";
import { listCinema } from "../../../../services";

type Cinema = {
    cinemaId: number;
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
            setCinemas(await listCinema());
        };
        fetchData();
    }, [cinemas]);

    return (
        <div>
            {cinemas.map((cinema) => (
                <div
                    key={cinema.cinemaId}
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

                        <a
                            href={`/admin/cinema/details/${cinema.cinemaId}`}
                            className="button btn-primary"
                            style={{
                                marginRight: "10px",
                                border: "1px solid black",
                            }}
                        >
                            Edit
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};
