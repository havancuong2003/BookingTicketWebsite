import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

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

    const [roomdetails, setRoomsDetails] = useState<Rooms>();
    const id = useParams().id;
    console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/room/details/${id}`
                );
                setRoomsDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);
    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        const roomData = {
            roomCode: data.roomCodeUpdate,
            cinemaId: Number(data.cinemaIdUpdate),
        };

        try {
            if (roomData.roomCode == "") {
                roomData.roomCode = roomdetails?.roomCode ?? "";
            }

            if (
                Number.isNaN(roomData.cinemaId) ||
                Number(roomData.cinemaId) == 0
            ) {
                roomData.cinemaId = roomdetails?.cinemaId ?? 0;
            }
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/room/update/${id}`,
                roomData
            );
            console.log("room updated successfully:", response.data);
            navigate("/admin/room/listroom");
        } catch (error) {
            console.log(roomData);
            console.error("Error updated room:", error, roomData);
        }
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
