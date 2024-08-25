import axios from "axios";
import React, { useEffect, useState } from "react";

type Movie = {
    id: number;
    title: string;
    description: string;
    director: string;
    actors: string;
    releaseDate: string;
    trailer: string;
};

export const ListMovie = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/movie/getAll`
                );
                setMovies(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    console.log("movies", movies);

    return (
        <div>
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    style={{
                        display: "flex",
                        marginBottom: "20px",
                        padding: "10px",
                    }}
                >
                    <div style={{ flex: 1, paddingRight: "20px" }}>
                        <h2>{movie.title}</h2>
                        <p>
                            <strong>Description:</strong> {movie.description}
                        </p>
                        <p>
                            <strong>Director:</strong> {movie.director}
                        </p>
                        <p>
                            <strong>Actors:</strong> {movie.actors}
                        </p>
                        <p>
                            <strong>Release Date:</strong> {movie.releaseDate}
                        </p>
                    </div>
                    <div style={{ flex: 1 }}>
                        <iframe
                            src={`https://drive.google.com/file/d/${movie.trailer}/preview`}
                            title={movie.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-96"
                        ></iframe>
                    </div>
                </div>
            ))}
        </div>
    );
};
