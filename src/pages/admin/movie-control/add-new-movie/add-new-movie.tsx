import React, { useState } from "react";
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FormData = {
    title: string;
    description: string;
    director: string;
    actors: string;
    releaseDate: string;
    rating: number;
    status: string;

    duration: number;
    createdAt: string;
    updatedAt: string;
};

export const AddNewMovie = () => {
    const accessToken = localStorage.getItem("accessToken");

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const uploadVideoToGoogleDrive = async (file: File) => {
        if (!accessToken) {
            console.error("No access token found, please login first.");
            return null;
        }

        const formData = new FormData();
        formData.append("video", file);

        try {
            const response = await fetch(`http://localhost:3000/auth/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Video uploaded successfully:", data);
                return data; // Return video ID
            } else {
                console.error("Failed to upload video:", await response.text());
                return null;
            }
        } catch (error) {
            console.error("Error uploading video:", error);
            return null;
        }
    };

    const onSubmit = async (data: FormData) => {
        if (!selectedFile) {
            console.error("No video file selected.");
            return;
        }
        console.log("data", data);

        const videoId = await uploadVideoToGoogleDrive(selectedFile);
        if (!videoId) {
            console.error("Failed to upload video. Movie creation aborted.");
            return;
        }
        const releaseDate = new Date(data.releaseDate).toISOString(); // Chuyển đổi thành định dạng ISO-8601

        const movieData = {
            title: data.title,
            description: data.description,
            director: data.director,
            actors: data.actors,
            releaseDate: releaseDate,
            rating: Number(data.rating), // Chuyển đổi thành số
            status: data.status,
            duration: Number(data.duration),
            trailer: videoId.id,
        };

        try {
            const response = await axios.post(
                "http://localhost:3000/movie/create",
                movieData
            );
            console.log("Movie added successfully:", response.data);
            navigate("/admin/listmovie");
        } catch (error) {
            console.error("Error adding movie:", error);
        }
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
                            <InputLabel>Video trailer</InputLabel>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
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
