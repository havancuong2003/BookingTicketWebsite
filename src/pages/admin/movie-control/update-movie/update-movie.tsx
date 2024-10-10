import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    InputLabel,
    MenuItem,
} from "@mui/material";
import { updateMovieAPI, getIDMovieAfterUpload } from "../../../../services";
import { Movie, MovieType } from "../../../../models";
import axios from "axios";

interface UpdateMovieProps {
    movie: Movie | null;
    onClose: () => void;
}

export const UpdateMovie = ({ movie, onClose }: UpdateMovieProps) => {
    const [updatedMovie, setUpdatedMovie] = useState<Movie | null>(movie);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [statuses, setStatuses] = useState<string[]>([]);
    const [newType, setNewType] = useState("");

    useEffect(() => {
        setUpdatedMovie(movie);
    }, [movie]);
    console.log("updatedMovie", updatedMovie);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/movie/getAllStatus"
                );
                setStatuses(response.data);
            } catch (error) {
                console.error("Error fetching statuses:", error);
            }
        };

        fetchStatuses();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const uploadVideoToGoogleDrive = async (
        file: File
    ): Promise<string | null> => {
        const formData = new FormData();
        formData.append("video", file);

        try {
            const videoData = await getIDMovieAfterUpload(formData);
            if (videoData.statusCode === 200) {
                return videoData.data.id;
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (updatedMovie) {
            let videoId = updatedMovie.trailer;

            if (selectedFile) {
                videoId = (await uploadVideoToGoogleDrive(selectedFile)) || "";
                if (!videoId) {
                    console.error(
                        "Failed to upload video. Movie update aborted."
                    );
                    return;
                }
            }

            try {
                const { id, createdAt, updatedAt, types, ...movieData } =
                    updatedMovie;

                // Chuyển đổi types sang mảng chuỗi
                const typeNames = types?.map((item) => item.type.name) || []; // Sử dụng || [] để đảm bảo không có lỗi nếu types là undefined

                // Thêm typeNames vào movieData
                const updatedMovieData = {
                    ...movieData,
                    types: typeNames,
                };
                console.log("updatedMovieData", updatedMovieData);
                if (id !== undefined) {
                    await updateMovieAPI(id, {
                        ...updatedMovieData,
                        trailer: videoId,
                    });
                    onClose();
                } else {
                    console.error("Invalid movie ID. Update aborted.");
                }
            } catch (err) {
                setError("Failed to update movie.");
            }
        }
    };

    const handleAddType = () => {
        const trimmedType = newType.trim();
        if (trimmedType && updatedMovie) {
            const newMovieType: MovieType = {
                id: Date.now(),
                name: trimmedType,
            }; // Tạo mới loại phim
            setUpdatedMovie((prev) => ({
                ...prev!,
                types: [...(prev?.types || []), { type: newMovieType }],
            }));
            setNewType("");
        }
    };

    const handleRemoveType = (typeToRemove: MovieType) => {
        if (updatedMovie) {
            setUpdatedMovie((prev) => ({
                ...prev!,
                types: (prev?.types || []).filter(
                    (item) => item.type.name !== typeToRemove.name // So sánh tên để xóa
                ),
            }));
        }
    };

    if (!updatedMovie) return null;

    return (
        <Dialog open={!!updatedMovie} onClose={onClose}>
            <DialogTitle>Update Movie</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={updatedMovie.title}
                        onChange={(e) =>
                            setUpdatedMovie({
                                ...updatedMovie,
                                title: e.target.value,
                            })
                        }
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={updatedMovie.description}
                        onChange={(e) =>
                            setUpdatedMovie({
                                ...updatedMovie,
                                description: e.target.value,
                            })
                        }
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Director"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={updatedMovie.director}
                        onChange={(e) =>
                            setUpdatedMovie({
                                ...updatedMovie,
                                director: e.target.value,
                            })
                        }
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Actors"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={updatedMovie.actors}
                        onChange={(e) =>
                            setUpdatedMovie({
                                ...updatedMovie,
                                actors: e.target.value,
                            })
                        }
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Release Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        value={updatedMovie.releaseDate.split("T")[0]}
                        onChange={(e) =>
                            setUpdatedMovie({
                                ...updatedMovie,
                                releaseDate: e.target.value,
                            })
                        }
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Rating"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={updatedMovie.rating}
                        onChange={(e) =>
                            setUpdatedMovie({
                                ...updatedMovie,
                                rating: Number(e.target.value),
                            })
                        }
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Status"
                        select
                        fullWidth
                        variant="outlined"
                        value={updatedMovie.status}
                        onChange={(e) =>
                            setUpdatedMovie({
                                ...updatedMovie,
                                status: e.target.value,
                            })
                        }
                        required
                    >
                        {statuses.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        margin="dense"
                        label="Banner Image Link"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={updatedMovie.banner}
                        onChange={(e) =>
                            setUpdatedMovie({
                                ...updatedMovie,
                                banner: e.target.value,
                            })
                        }
                        required
                    />

                    <div>
                        <InputLabel>Upload Trailer</InputLabel>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <TextField
                        margin="dense"
                        label="Add Type"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                    />
                    <Button onClick={handleAddType} color="primary">
                        Add Type
                    </Button>

                    <div>
                        {updatedMovie.types?.map((item) => (
                            <div
                                key={item.type.id} // Sử dụng item.type.id làm key
                                className="flex items-center justify-between"
                            >
                                <span>{item.type.name}</span>{" "}
                                {/* Truy cập name của type */}
                                <Button
                                    onClick={() => handleRemoveType(item.type)} // Truyền id để xóa
                                    color="secondary"
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Update Movie
                </Button>
            </DialogActions>
        </Dialog>
    );
};
