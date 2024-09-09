import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
    detailRoom,
    detailScreeing,
    listCinema,
    listMovie,
    listRoom,
    listScreening,
    updateRoom,
} from "../../../../services";

type FormData = {
    movieIdUpdate: number;
    cinemaIdUpdate: number;
    roomIdUpdate: number;
    startTimeUpdate: string;
    endTimeUpdate: string;
};
type screeningDetails = {
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

export const UpdateScreening = () => {
    const [cinema, setCinemas] = useState<Cinema[]>([]);
    const [movie, setMovies] = useState<Movie[]>([]);
    const [room, setRooms] = useState<Room[]>([]);

    const [screeningDetail, setScreeningDetail] = useState<screeningDetails>();
    const id = Number(useParams().id);

    useEffect(() => {
        const fetchData = async () => {
            setScreeningDetail(await detailScreeing(id));
        };

        fetchData();
    }, [screeningDetail]);
    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        const creeningUpdateData = {
            movieId: Number(data.movieIdUpdate),
            cinemaId: Number(data.cinemaIdUpdate),
            roomId: Number(data.roomIdUpdate),

            startTime: data.startTimeUpdate,
            endTime: data.endTimeUpdate,
        };
        if (creeningUpdateData.startTime === "") {
            creeningUpdateData.startTime = screeningDetail?.startTime ?? "";
        }

        updateRoom(creeningUpdateData, id, navigate);
    };
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setScreeningDetail(await detailScreeing(id));
    //     };

    //     fetchData();
    // }, [screeningDetail]);
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Phim</p>
                <div className="grid grid-cols-2 gap-4">
                    <select id="movieId" {...register("movieIdUpdate")}>
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
                    <select id="cinemaId" {...register("cinemaIdUpdate")}>
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
                    <select id="roomId" {...register("roomIdUpdate")}>
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
                        {...register("startTimeUpdate", {
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
    );
};
