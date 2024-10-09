import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import goku from "../../../assets/img/ABC.png";
import { MovieShow as MovieData } from "../../../models";
import { getMoviesAPI } from "../../../services";

export const Movie: React.FC = () => {
    const [selected, setSelected] = useState(1);
    const [movieList, setMovieList] = useState<MovieData[]>([]);
    const [movieFill, setMovieFill] = useState<MovieData[]>([]);
    const handleClick = (index: number) => {
        setSelected(index);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getMoviesAPI();

                setMovieList(response);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
        setMovieFill(filterMovies(movieList, selected));
    }, [selected]);

    const filterMovies = (movies: MovieData[], selected: number) => {
        if (selected === 1) {
            return movies.filter((movie) => movie.status === "NOW_SHOWING");
        } else if (selected === 2) {
            return movies.filter((movie) => movie.status === "COMING_SOON");
        }
        return movies; // Return all movies if selected is neither 1 nor 2
    };

    return (
        <>
            <div className="mt-20 flex justify-center space-x-6">
                {/* Các nút chọn phim */}
                <div
                    className={`m-4 p-6 bg-slate-100 rounded-lg shadow-lg transform hover:scale-105 ease-in-out cursor-pointer ${
                        selected === 1
                            ? "text-black border-b-4 border-blue-500 bg-[#9de6f7]"
                            : "text-gray-800"
                    }`}
                    onClick={() => handleClick(1)}
                >
                    <span
                        className={`relative text-xl font-bold ${
                            selected === 1 ? "text-black" : "text-gray-800"
                        }`}
                    >
                        PHIM SẮP CHIẾU
                    </span>
                </div>
                <div
                    className={`m-4 p-6 bg-slate-100 rounded-lg shadow-lg transform hover:scale-105 ease-in-out cursor-pointer ${
                        selected === 2
                            ? "text-black border-b-4 border-blue-500 bg-[#9de6f7]"
                            : "text-gray-800"
                    }`}
                    onClick={() => handleClick(2)}
                >
                    <span
                        className={`relative text-xl font-bold ${
                            selected === 2 ? "text-black" : "text-gray-800"
                        }`}
                    >
                        PHIM ĐANG CHIẾU
                    </span>
                </div>
            </div>

            <div className="container mx-auto px-4 mb-40 mt-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-20">
                    {movieFill.map((movie) => (
                        <div key={movie.id} className="flex justify-center">
                            <Card sx={{ maxWidth: 270 }}>
                                <CardMedia
                                    sx={{ height: 500, width: 270 }}
                                    image={movie.banner || goku} // Sử dụng banner nếu có, nếu không thì dùng hình mặc định
                                    title="Film poster"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontFamily:
                                                "'trebuchet ms', sans-serif",
                                            fontWeight: "bold",
                                            color: "#337ab7",
                                        }}
                                    >
                                        {movie.title}
                                    </Typography>
                                    <Typography variant="body2">
                                        <span className="text-sm">
                                            <span className="text-black font-bold">
                                                Thể loại
                                            </span>
                                            :{" "}
                                            {movie.types
                                                ?.map((type) => type.type.name)
                                                .join(", ") || "Không có"}
                                        </span>
                                    </Typography>
                                    <Typography variant="body2">
                                        <span className="text-sm">
                                            <span className="text-black font-bold">
                                                Thời gian
                                            </span>
                                            :{" "}
                                            {(() => {
                                                const minutes = movie.duration;
                                                const hours = Math.floor(
                                                    minutes / 60
                                                );
                                                const remainingMinutes =
                                                    minutes % 60;

                                                if (hours >= 1) {
                                                    return `${hours} h ${remainingMinutes} min`;
                                                } else {
                                                    return `${minutes} min`;
                                                }
                                            })()}
                                        </span>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        sx={{ width: 270 }}
                                    >
                                        Mua vé
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
