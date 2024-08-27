import { useEffect, useState } from "react";
import {
    detailMovie,
    detailRoom,
    listCinema,
    listMovie,
    listRoom,
} from "../../../../services";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    convertToDateTimeLocal,
    createScreening,
} from "../../../../services/admin/screening/screening";

type FormData = {
    movieId: number;
    cinemaId: number;
    roomId: number;
    startTime: string;
    endTime: string;
};

type Cinema = {
    cinemaId: number;
    name: string;
};
type Movie = {
    id: number;
    title: string;
    duration: number;
};
type Room = {
    id: number;
    roomId: number;
    roomCode: string;
};

export const AddNewScreening = () => {
    const [cinema, setCinemas] = useState<Cinema[]>([]);
    const [movie, setMovies] = useState<Movie[]>([]);
    const [room, setRooms] = useState<Room[]>([]);

    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

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
            cinemaId: Number(data.cinemaId),
            roomId: Number(data.roomId),
            startTime: new Date(data.startTime).toISOString(),

            endTime: new Date(endTimee).toISOString(),
        };
        console.log(endTimee);

        createScreening(roomData, navigate);
    };
    useEffect(() => {
        const fetchData = async () => {
            setCinemas(await listCinema());
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            setMovies(await listMovie());
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            setRooms(await listRoom());
        };

        fetchData();
    }, []);

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-lg">
                <h1 className="text-center mb-6">Thêm khung gio chieu mới</h1>
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
                        <p>Rap chieu</p>
                        <br />
                        <select id="cinemaId" {...register("cinemaId")}>
                            {cinema.map((cnm) => (
                                <option
                                    value={cnm.cinemaId.toString()}
                                    style={{ border: "1px solid black" }}
                                >
                                    {cnm.name}
                                </option>
                            ))}
                        </select>
                        <br />
                        <p>Phong chieu</p>
                        <br />
                        <select id="roomId" {...register("roomId")}>
                            {room.map((r) => (
                                <option
                                    value={r.roomId.toString()}
                                    style={{ border: "1px solid black" }}
                                >
                                    {r.roomCode}
                                </option>
                            ))}
                        </select>
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
                        {/* <p>thoi gian ket thuc</p> */}
                        {/* <TextField
                            id="endTime"
                            variant="outlined"
                            type="datetime-local"
                            fullWidth
                            margin="normal"
                            {...register("endTime", {
                                required: "Thoi gian ket thuc là bắt buộc.",
                            })}
                        /> */}

                        {/* <DateTimePicker />
                        <Typography>Stored value: </Typography> */}
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
