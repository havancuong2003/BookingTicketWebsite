import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { detailCinema, updateCinema } from "../../../../services";

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
    const [cinemadetails, SetCinemaDetails] = useState<CinemaDetails>();
    const id = useParams().id;

    useEffect(() => {
        const fetchData = async () => {
            const data = await detailCinema(id);
            SetCinemaDetails(data);
        };
        fetchData();
    }, []);

    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        const cinemaData = {
            name: data.nameUpdate,
            location: data.locationUpdate,
            totalScreens: Number(data.totalScreensUpdate),
        };
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
        updateCinema(id, cinemaData, navigate);
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
