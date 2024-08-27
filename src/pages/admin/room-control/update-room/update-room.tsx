import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { detailRoom, listCinema, updateRoom } from "../../../../services";
import { update } from "ramda";

type Rooms = {
    roomId: number;
    roomCode: string;
    cinemaId: number;
};
type FormData = {
    roomCodeUpdate: string;
    cinemaIdUpdate: number;
};

type Cinema = {
    cinemaId: number;
    name: string;
};

export const UpdateRoom = () => {
    const [cinemas, setCinemas] = useState<Cinema[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setCinemas(await listCinema());
        };

        fetchData();
    }, [cinemas]);

    const [roomdetails, setRoomsDetails] = useState<Rooms>();
    const id = Number(useParams().id);

    useEffect(() => {
        const fetchData = async () => {
            setRoomsDetails(await detailRoom(id));
        };

        fetchData();
    }, [roomdetails]);
    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        const roomData = {
            roomCode: data.roomCodeUpdate,
            cinemaId: Number(data.cinemaIdUpdate),
        };
        if (roomData.roomCode == "") {
            roomData.roomCode = roomdetails?.roomCode ?? "";
        }

        if (Number.isNaN(roomData.cinemaId) || Number(roomData.cinemaId) == 0) {
            roomData.cinemaId = roomdetails?.cinemaId ?? 0;
        }
        updateRoom(roomData, id, navigate);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        id="roomCodeUpdate"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder={roomdetails?.roomCode}
                        {...register("roomCodeUpdate")}
                    />

                    <select id="cinemaIdUpdate" {...register("cinemaIdUpdate")}>
                        {cinemas.map((room) => (
                            <option
                                value={room.cinemaId.toString()}
                                style={{ border: "1px solid black" }}
                            >
                                {room.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="mt-4 w-full"
                >
                    Update
                </Button>
            </form>
        </div>
    );
};
