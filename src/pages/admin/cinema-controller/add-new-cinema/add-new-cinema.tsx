import { Button, Snackbar, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createCinema } from "../../../../services";
import React from "react";
type FormData = {
    name: string;
    location: string;
    totalScreens: number;
};

export const AddNewCinema = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    const onSubmit = async (data: FormData) => {
        if (!data.name || data.name === "") {
            setSnackbarMessage("Vui lòng điền tên rạp!");
            setOpenSnackbar(true);
            return;
        } else if (!data.location || data.location === "") {
            setSnackbarMessage("Vui lòng điền địa chỉ rạp!");
            setOpenSnackbar(true);
            return;
        } else if (!data.totalScreens || data.totalScreens === 0) {
            setSnackbarMessage("Vui lòng điền số phòng chiếu!");
            setOpenSnackbar(true);
            return;
        }

        const cinemaData = {
            name: data.name,
            location: data.location,
            totalScreens: Number(data.totalScreens),
        };
        createCinema(cinemaData, navigate);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-lg">
                <h1 className="text-center mb-6">Thêm 1 rạp chiếu mới</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            id="name"
                            label="Tên rạp"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("name", {})}
                        />
                        <TextField
                            id="location"
                            label="Địa chỉ rạp"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("location", {})}
                        />
                        <TextField
                            id="totalScreens"
                            type="number"
                            label="Số phòng chiếu"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("totalScreens", {})}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mt-4 w-full"
                    >
                        Thêm rạp chiếu mới
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
