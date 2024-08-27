import { Button, TextField } from "@mui/material";
import axios from "axios";
import { map } from "ramda";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
type FormData = {
    roomCodeInput: string;
    cinemaIDInput: number;
};
type Cinema = {
    cinemaId: number;
    name: string;
};

export const AddNewRoom = () => {
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

    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        const roomData = {
            roomCode: data.roomCodeInput,
            cinemaId: Number(data.cinemaIDInput),
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/room/create`,
                roomData
            );
            console.log("Room added successfully:", response.data);
            navigate("/admin/room/listroom");
        } catch (error) {
            console.log(roomData);
            console.error("Error adding room:", error, roomData);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-lg">
                <h1 className="text-center mb-6">Thêm 1 rap chieu mới</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            id="roomCodeInput"
                            label="ma phong"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("roomCodeInput", {
                                required: "Ma phong là bắt buộc.",
                            })}
                        />

                        <select
                            id="cinemaIDInput"
                            {...register("cinemaIDInput")}
                        >
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
                        Thêm phong chieu moi
                    </Button>
                </form>
            </div>
        </div>
    );
};
