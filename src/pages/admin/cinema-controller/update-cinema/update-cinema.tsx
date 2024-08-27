import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

type CinemaDetails = {
    cinemaId: number;
    name: string;
    location: string;
    totalScreens: number;
    createdAt: String;
    updatedAt: String;
};
type FormData = {
    nameUpdate: string;
    locationUpdate: string;
    totalScreensUpdate: number;
};
export const UpdateCinema = () => {
    const [cinemadetails, setCinemasDetails] = useState<CinemaDetails>();
    const id = useParams().id;
    console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/cinema/details/${id}`
                );
                setCinemasDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);
    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        const cinemaData = {
            name: data.nameUpdate,
            location: data.locationUpdate,
            totalScreens: Number(data.totalScreensUpdate),
        };

        try {
            if (cinemaData.name == "") {
                cinemaData.name = cinemadetails?.name ?? "";
            }
            if (cinemaData.location == "") {
                cinemaData.location = cinemadetails?.location ?? "";
            }
            if (
                Number.isNaN(cinemaData.totalScreens) ||
                Number(cinemaData.totalScreens) == 0
            ) {
                cinemaData.totalScreens = cinemadetails?.totalScreens ?? 0;
            }
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/cinema/update/${id}`,
                cinemaData
            );
            console.log("Cinema updated successfully:", response.data);
            navigate("/admin/cinema/listcinema");
        } catch (error) {
            console.log(cinemaData);
            console.error("Error updated cinema:", error, cinemaData);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <TextField
                        id="name2"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder={cinemadetails?.name}
                        {...register("nameUpdate")}
                    />
                    <TextField
                        id="location2"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder={cinemadetails?.location}
                        {...register("locationUpdate")}
                    />
                    <TextField
                        id="totalScreens2"
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder={cinemadetails?.totalScreens.toString()}
                        {...register("totalScreensUpdate")}
                    />
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
