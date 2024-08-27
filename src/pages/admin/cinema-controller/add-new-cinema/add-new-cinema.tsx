import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
type FormData = {
    name: string;
    location: string;
    totalScreens: number;
};
export const AddNewCinema = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        const cinemaData = {
            name: data.name,
            location: data.location,
            totalScreens: Number(data.totalScreens),
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/cinema/create`,
                cinemaData
            );
            console.log("Cinema added successfully:", response.data);
            navigate("/admin/cinema/listcinema");
        } catch (error) {
            console.log(cinemaData);

            console.error("Error adding cinema:", error, cinemaData);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-lg">
                <h1 className="text-center mb-6">Thêm 1 rap chieu mới</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            id="name"
                            label="ten rap"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("name", {
                                required: "Tên rạp là bắt buộc.",
                            })}
                        />
                        <TextField
                            id="location"
                            label="dia chi rap"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("location", {
                                required: "Địa chỉ là bắt buộc.",
                            })}
                        />
                        <TextField
                            id="totalScreens"
                            type="number"
                            label="Số phòng chiếu"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("totalScreens", {
                                required: "Số màn chiếu là bắt buộc.",
                            })}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mt-4 w-full"
                    >
                        Thêm phim
                    </Button>
                </form>
            </div>
        </div>
    );
};
