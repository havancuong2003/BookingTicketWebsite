import { Button, TextField, Snackbar } from "@mui/material"; // Thêm Snackbar
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
    const { cinemaId } = useParams();
    const [cinemas, setCinemas] = useState<Cinema[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setCinemas(await listCinema());
        };

        fetchData();
    }, []);

    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        if (!data.roomCodeInput || data.roomCodeInput === "") {
            setSnackbarMessage("Vui lòng điền mã phòng!");
            setOpenSnackbar(true);
            return;
        }

        const roomData = {
            roomCode: data.roomCodeInput,
            cinemaId: Number(cinemaId),
        };

        createRoom(roomData, navigate, cinemaId);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-lg">
                <h1 className="text-center mb-6">Thêm phòng chiếu mới</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            id="roomCodeInput"
                            label="mã phòng"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("roomCodeInput", {})}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mt-4 w-full"
                    >
                        Thêm phòng chiếu mới
                    </Button>
                </form>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={snackbarMessage}
                />
            </div>
        </div>
    );
};
