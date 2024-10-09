import { useEffect, useState } from "react";
import { listMovie } from "../../../../services";
import { Movie } from "../../../../models";
import { UpdateMovie } from "../update-movie/update-movie"; // Import the UpdateMovie component

export const ListMovie = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const listMovies = async () => {
        const data = await listMovie();
        setMovies(data);
    };

    useEffect(() => {
        listMovies();
    }, []);

    const handleEditClick = (movie: Movie) => {
        console.log("check movie", movie);
        setSelectedMovie(movie);
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null); // Clear selected movie
    };

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
                        <p>
                            <strong>Rating:</strong> {movie.rating}
                        </p>
                        <p>
                            <strong>Status:</strong> {movie.status}
                        </p>
                        <button onClick={() => handleEditClick(movie)}>
                            Edit
                        </button>{" "}
                        {/* Edit button */}
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
            {isModalOpen && selectedMovie && (
                <div>
                    aaaa
                    <UpdateMovie
                        movie={selectedMovie}
                        onClose={closeModal}
                    />{" "}
                    // Show modal
                </div>
            )}
        </div>
    );
};
