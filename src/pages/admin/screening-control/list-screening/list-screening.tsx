import { useEffect, useState } from "react";
import {
    convertToDateTimePublish,
    listCinema,
    listMovie,
    listRoom,
    listScreening,
} from "../../../../services";

type Screening = {
    screeningId: number;
    movieId: number;
    cinemaId: number;
    roomId: number;
    startTime: string;
    endTime: string;
    movieName: string;
    cinemaName: string;
    roomCode: string;
};
type Cinema = {
    cinemaId: number;
    name: string;
};
type Movie = {
    id: number;
    title: string;
    duration: number;
};
type Room = {
    roomId: number;
    roomCode: string;
};

export const ListScreening = () => {
    const [screening, setScreening] = useState<Screening[]>([]);
    const [cinema, setCinemas] = useState<Cinema[]>([]);
    const [movie, setMovies] = useState<Movie[]>([]);
    const [room, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setScreening(await listScreening());
        };
        fetchData();
    }, [screening]);

    useEffect(() => {
        const fetchData = async () => {
            setCinemas(await listCinema());
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            setMovies(await listMovie());
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            setRooms(await listRoom());
        };

        fetchData();
    }, []);

    screening.map((sc) => {
        sc.startTime = convertToDateTimePublish(new Date(sc.startTime));
        sc.endTime = convertToDateTimePublish(new Date(sc.endTime));
        sc.movieName = movie.find((mv) => mv.id == sc.movieId)?.title ?? "";
        sc.cinemaName =
            cinema.find((cin) => cin.cinemaId == sc.cinemaId)?.name ?? "";
        sc.roomCode = room.find((rm) => rm.roomId == sc.roomId)?.roomCode ?? "";
    });

    return (
        <div>
            {screening.map((sc) => (
                <div
                    key={sc.screeningId}
                    style={{
                        display: "flex",
                        marginBottom: "20px",
                        padding: "10px",
                    }}
                >
                    <div style={{ flex: 1, paddingRight: "20px" }}>
                        <h2>{sc.screeningId}</h2>
                        <p>
                            <strong>ten phim:</strong> {sc.movieName}
                        </p>
                        <p>
                            <strong>rap chieu:</strong> {sc.cinemaName}
                        </p>

                        <p>
                            <strong>ma phong:</strong> {sc.roomCode}
                        </p>
                        <p>
                            <strong>Thoi gian chieu:</strong>
                            {sc.startTime} - {sc.endTime}
                        </p>

                        <a
                            href={`/admin/screening/details/${sc.screeningId}`}
                            className="button btn-primary"
                            style={{
                                marginRight: "10px",
                                border: "1px solid black",
                            }}
                        >
                            Edit
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};
