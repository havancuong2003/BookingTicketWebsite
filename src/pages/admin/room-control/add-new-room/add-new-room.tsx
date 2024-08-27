import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createRoom, listCinema } from "../../../../services";
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
            setCinemas(await listCinema());
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

        createRoom(roomData, navigate);
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
