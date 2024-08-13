import { Button } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import goku from "../../../assets/img/ABC.png";
type Movie = {
    id: number;
    name: string;
    image: string;
    time: string;
    description: string;
    type?: string;
};

const data: Movie[] = [
    {
        id: 1,
        name: "Movie 1",
        image: "https://picsum.photos/id/1/200/300",
        time: "30 minutes",
        description: "Description 1",
        type: "Action",
    },
    {
        id: 2,
        name: "Movie 2",
        image: "https://picsum.photos/id/2/200/300",
        time: "1 hour 30 minutes",
        description: "Description 2",
        type: "Comedy",
    },
    {
        id: 3,
        name: "Movie 3",
        image: "https://picsum.photos/id/3/200/300",
        time: "1 hour",
        description: "Description 3",
        type: "Drama",
    },
    {
        id: 4,
        name: "Movie 4",
        image: "https://picsum.photos/id/4/200/300",
        time: "95 minutes",
        description: "Description 4",
        type: "Horror",
    },
    {
        id: 5,
        name: "Movie 1",
        image: "https://picsum.photos/id/1/200/300",
        time: "35 minutes",
        description: "Description 1",
        type: "Action",
    },
    {
        id: 6,
        name: "Movie 2",
        image: "https://picsum.photos/id/2/200/300",
        time: "93 minutes",
        description: "Description 2",
        type: "Comedy",
    },
    {
        id: 7,
        name: "Movie 3",
        image: "https://picsum.photos/id/3/200/300",
        time: "45 minutes",
        description: "Description 3",
        type: "Drama",
    },
    {
        id: 8,
        name: "Movie 4",
        image: "https://picsum.photos/id/4/200/300",
        time: "100 minutes",
        description: "Description 4",
        type: "Horror",
    },
];

export const Movie: React.FC = () => {
    const [selected, setSelected] = useState(1);

    const handleClick = (index: number) => {
        setSelected(index);
    };

    return (
        <>
            <div className="mt-20 flex justify-center space-x-6">
                <div
                    className={`m-4 p-6 bg-slate-100 rounded-lg shadow-lg transform hover:scale-105 ease-in-out cursor-pointer ${
                        selected == 1
                            ? "text-black border-b-4 border-blue-500 bg-[#9de6f7]"
                            : "text-gray-800"
                    }`}
                    onClick={() => handleClick(1)}
                >
                    <span
                        className={`relative text-xl font-bold  ${
                            selected == 1 ? "text-black " : "text-gray-800"
                        }`}
                    >
                        PHIM SẮP CHIẾU
                    </span>
                </div>
                <div
                    className={`m-4 p-6 bg-slate-100 rounded-lg shadow-lg transform hover:scale-105 ease-in-out cursor-pointer ${
                        selected == 2
                            ? "text-black border-b-4 border-blue-500 bg-[#9de6f7]"
                            : "text-gray-800"
                    }`}
                    onClick={() => handleClick(2)}
                >
                    <span
                        className={`relative text-xl font-bold  ${
                            selected == 2 ? "text-black " : "text-gray-800"
                        }`}
                    >
                        PHIM SẮP CHIẾU
                    </span>
                </div>
            </div>
            <div className="container mx-auto px-4 mb-40 mt-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-20 ">
                    {data.map((movie) => (
                        <div key={movie.id} className="">
                            <Card sx={{ maxWidth: 270 }}>
                                <CardMedia
                                    sx={{ height: 500, width: 270 }}
                                    image={goku}
                                    title="Film poster"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {movie.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        <span className="text-sm">
                                            Thể loại: {movie.type}
                                        </span>
                                    </Typography>
                                    <Typography variant="body2">
                                        <span className="text-sm">
                                            Thời lượng: {movie.time}
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
