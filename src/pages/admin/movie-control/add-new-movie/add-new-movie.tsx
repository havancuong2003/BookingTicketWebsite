import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";

type FormData = {
    movieId: number;
    title: string;
    description: string;
    director: string;
    actors: string;
    releaseDate: string;
    rating: number;
    status: string;
    img: FileList;
    videoTrailer: FileList;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
};

export const AddNewMovie = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("director", data.director);
        formData.append("actors", data.actors);
        formData.append("releaseDate", data.releaseDate);
        formData.append("rating", data.rating.toString());
        formData.append("status", data.status);
        formData.append("img", data.img[0]);
        formData.append("videoTrailer", data.videoTrailer[0]);
        formData.append("duration", data.duration.toString());
        formData.append("createdAt", data.createdAt.toISOString());
        formData.append("updatedAt", data.updatedAt.toISOString());

        console.log([...formData.entries()]); // For debugging purposes

        // Here you would typically send formData to your API
        // e.g., axios.post("/api/movies", formData);
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-lg">
                <h1 className="text-center mb-6">Thêm 1 bộ phim mới</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            id="title"
                            label="Tiêu đề phim"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("title", {
                                required: "Tiêu đề là bắt buộc.",
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                        <TextField
                            id="description"
                            label="Mô tả phim"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("description", {
                                required: "Mô tả là bắt buộc.",
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                        <TextField
                            id="director"
                            label="Đạo diễn"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("director", {
                                required: "Đạo diễn là bắt buộc.",
                            })}
                            error={!!errors.director}
                            helperText={errors.director?.message}
                        />
                        <TextField
                            id="actors"
                            label="Diễn viên"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("actors", {
                                required: "Diễn viên là bắt buộc.",
                            })}
                            error={!!errors.actors}
                            helperText={errors.actors?.message}
                        />
                        <TextField
                            id="releaseDate"
                            label="Ngày phát hành"
                            variant="outlined"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            {...register("releaseDate", {
                                required: "Ngày phát hành là bắt buộc.",
                            })}
                            error={!!errors.releaseDate}
                            helperText={errors.releaseDate?.message}
                        />
                        <TextField
                            id="rating"
                            label="Xếp hạng"
                            variant="outlined"
                            type="number"
                            fullWidth
                            margin="normal"
                            {...register("rating", {
                                required: "Xếp hạng là bắt buộc.",
                                min: {
                                    value: 1,
                                    message:
                                        "Xếp hạng phải lớn hơn hoặc bằng 1.",
                                },
                                max: {
                                    value: 10,
                                    message:
                                        "Xếp hạng phải nhỏ hơn hoặc bằng 10.",
                                },
                            })}
                            error={!!errors.rating}
                            helperText={errors.rating?.message}
                        />
                        <FormControl
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        >
                            <InputLabel id="status-label">
                                Trạng thái
                            </InputLabel>
                            <Select
                                labelId="status-label"
                                id="status"
                                label="Trạng thái"
                                defaultValue=""
                                {...register("status", {
                                    required: "Trạng thái là bắt buộc.",
                                })}
                                error={!!errors.status}
                            >
                                <MenuItem value="đang chiếu">
                                    Đang chiếu
                                </MenuItem>
                                <MenuItem value="sắp chiếu">Sắp chiếu</MenuItem>
                                <MenuItem value="ngừng chiếu">
                                    Ngừng chiếu
                                </MenuItem>
                            </Select>
                            {errors.status && (
                                <p className="text-red-500">
                                    {errors.status.message}
                                </p>
                            )}
                        </FormControl>
                        <TextField
                            id="duration"
                            label="Thời gian chạy (phút)"
                            variant="outlined"
                            type="number"
                            fullWidth
                            margin="normal"
                            {...register("duration", {
                                required: "Thời gian chạy là bắt buộc.",
                            })}
                            error={!!errors.duration}
                            helperText={errors.duration?.message}
                        />
                        <div className="col-span-2">
                            <InputLabel>Ảnh banner</InputLabel>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("img", {
                                    required: "Ảnh banner là bắt buộc.",
                                })}
                                className="mb-4"
                            />
                            {errors.img && (
                                <p className="text-red-500">
                                    {errors.img.message}
                                </p>
                            )}
                        </div>
                        <div className="col-span-2">
                            <InputLabel>Video trailer</InputLabel>
                            <input
                                type="file"
                                accept="video/*"
                                {...register("videoTrailer", {
                                    required: "Video trailer là bắt buộc.",
                                })}
                                className="mb-4"
                            />
                            {errors.videoTrailer && (
                                <p className="text-red-500">
                                    {errors.videoTrailer.message}
                                </p>
                            )}
                        </div>
                        <TextField
                            id="createdAt"
                            label="Ngày tạo"
                            variant="outlined"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            {...register("createdAt", {
                                required: "Ngày tạo là bắt buộc.",
                            })}
                            error={!!errors.createdAt}
                            helperText={errors.createdAt?.message}
                        />
                        <TextField
                            id="updatedAt"
                            label="Ngày cập nhật"
                            variant="outlined"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            {...register("updatedAt", {
                                required: "Ngày cập nhật là bắt buộc.",
                            })}
                            error={!!errors.updatedAt}
                            helperText={errors.updatedAt?.message}
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
