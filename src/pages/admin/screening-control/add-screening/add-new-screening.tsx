import { useEffect, useState } from "react";
import {
    detailRoom,
    listCinema,
    listMovie,
    listRoom,
} from "../../../../services";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { convertToDateTimeLocal, createScreening } from "../../../../services";

type FormData = {
    movieId: number;
    cinemaId: number;
    roomId: number;
    startTime: string;
    endTime: string;
};

type Movie = {
    id: number;
    title: string;
    duration: number;
};
type RoomDetails = {
    roomId: number;
    roomCode: string;
    cinemaId: number;
    cinemaName: string;
};

export const AddNewScreening = () => {
    const { roomId } = useParams();
    const [movie, setMovies] = useState<Movie[]>([]);

    const { register, handleSubmit } = useForm<FormData>();
    const [roomdetails, setRoomsDetails] = useState<RoomDetails>();

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            setRoomsDetails(await detailRoom(roomId));
        };

        fetchData();
    }, [roomdetails]);
    useEffect(() => {
        const fetchData = async () => {
            setMovies(await listMovie());
        };

        fetchData();
    }, []);
    const onSubmit = async (data: FormData) => {
        const durationMovie = movie.find(
            (mv) => mv.id == data.movieId
        )?.duration;
        const stTime = new Date(data.startTime);
        const eTime = new Date(
            stTime.getTime() + Number(durationMovie) * 60000 + 15 * 60000
        );
        const date = new Date(eTime);
        const endTimee = convertToDateTimeLocal(date);
        const roomData = {
            movieId: Number(data.movieId),
            roomId: Number(roomId),
            startTime: new Date(data.startTime).toISOString(),
            endTime: new Date(endTimee).toISOString(),
        };
        console.log(endTimee);

        createScreening(roomData, navigate, roomId);
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-lg">
                <h1 className="text-center mb-6">
                    Thêm khung giờ chiếu mới cho phòng {roomdetails?.roomCode},
                    rạp {roomdetails?.cinemaName}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>Phim</p>
                    <div className="grid grid-cols-2 gap-4">
                        <select id="movieId" {...register("movieId")}>
                            {movie.map((mv) => (
                                <option
                                    value={mv.id}
                                    style={{ border: "1px solid black" }}
                                >
                                    {mv.title}
                                </option>
                            ))}
                        </select>
                        <br />
                        <br />

                        <br />
                        <p>thoi gian bat dau</p>
                        <TextField
                            id="startTime"
                            variant="outlined"
                            type="datetime-local"
                            fullWidth
                            margin="normal"
                            {...register("startTime", {
                                required: "Thoi gian bat dau là bắt buộc.",
                            })}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mt-4 w-full"
                    >
                        Thêm lich chieu moi
                    </Button>
                </form>
            </div>
        </div>
    );
};
