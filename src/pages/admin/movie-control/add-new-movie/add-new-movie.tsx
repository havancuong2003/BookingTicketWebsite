import React, { useState } from "react";
import { TextField, Button, InputLabel, Chip } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createMovie, getIDMovieAfterUpload } from "../../../../services";

type FormData = {
    title: string;
    description: string;
    director: string;
    actors: string;
    releaseDate: string;
    rating: number;
    duration: number;
    banner: string; // New property for banner image link
    types: string[]; // New property for movie types
};

export const AddNewMovie = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [notiSuccess, setNotiSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [types, setTypes] = useState<string[]>([]); // State to hold movie types
    const [currentType, setCurrentType] = useState<string>(""); // State to hold current type input
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>();
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const uploadVideoToGoogleDrive = async (
        file: File
    ): Promise<string | null> => {
        setNotiSuccess(null);
        setError(null);
        const formData = new FormData();
        formData.append("video", file);

        try {
            const videoData = await getIDMovieAfterUpload(formData);
            console.log("video data", videoData);

            if (videoData.statusCode === 200) {
                setNotiSuccess(videoData.message);
                // Return a Promise to wait for 3 seconds
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(videoData.data.id);
                    }, 3000);
                });
            } else {
                setError(videoData.message);
                return null;
            }
        } catch (error) {
            setError("Có lỗi xảy ra khi tải video lên.");
            console.error("Error uploading video:", error);
            return null;
        }
    };

    const handleAddType = () => {
        if (currentType && !types.includes(currentType)) {
            setTypes([...types, currentType]);
            setCurrentType("");
        }
    };

    const handleRemoveType = (typeToRemove: string) => {
        setTypes(types.filter((type) => type !== typeToRemove));
    };

    const onSubmit = async (data: FormData) => {
        if (!selectedFile) {
            console.error("No video file selected.");
            return;
        }

        const videoId = await uploadVideoToGoogleDrive(selectedFile);
        console.log("video id nayyyyyy", videoId);

        if (!videoId) {
            console.error("Failed to upload video. Movie creation aborted.");
            return;
        }
        const releaseDate = new Date(data.releaseDate); // Convert to ISO-8601 format
        console.log("check release date", releaseDate);

        const movieData = {
            title: data.title,
            description: data.description,
            director: data.director,
            actors: data.actors,
            releaseDate: releaseDate,
            rating: Number(data.rating), // Convert to number
            duration: Number(data.duration),
            trailer: videoId,
            banner: data.banner, // Include banner in movie data
            types: types, // Include types in movie data
        };

        createMovie(movieData, navigate);
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-lg">
                {error && <h3 className="text-red-500 text-center">{error}</h3>}
                {notiSuccess && (
                    <h3 className="text-green-500 text-center">
                        {notiSuccess}
                    </h3>
                )}
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
                        <TextField
                            id="banner" // New input for banner image link
                            label="Banner Image Link"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register("banner", {
                                required: "Banner image link is required.",
                            })}
                            error={!!errors.banner}
                            helperText={errors.banner?.message}
                        />

                        {/* New input for movie types */}
                        <div className="col-span-2">
                            <InputLabel>Movie Types</InputLabel>
                            <div className="flex items-center">
                                <TextField
                                    value={currentType}
                                    onChange={(e) =>
                                        setCurrentType(e.target.value)
                                    }
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter a movie type"
                                />
                                <Button
                                    onClick={handleAddType}
                                    variant="contained"
                                    color="primary"
                                    style={{ marginLeft: "10px" }}
                                >
                                    Add
                                </Button>
                            </div>
                            <div className="mt-2">
                                {types.map((type, index) => (
                                    <Chip
                                        key={index}
                                        label={type}
                                        onDelete={() => handleRemoveType(type)}
                                        color="primary"
                                        style={{ margin: "2px" }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Hidden input to include types in form data */}
                        <Controller
                            name="types"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <input type="hidden" {...field} value={types} />
                            )}
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
