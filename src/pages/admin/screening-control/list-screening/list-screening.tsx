import { useEffect, useState } from "react";
import {
    convertToDateTimePublish,
    detailRoom,
    getAllRoom,
    listCinema,
    listMovie,
    listScreeningByRoomId,
} from "../../../../services";
import { useParams } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
} from "@mui/material"; // Import MUI components
import TablePagination from "@mui/material/TablePagination";
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
type RoomDetails = {
    roomId: number;
    roomCode: string;
    cinemaId: number;
    cinemaName: string;
};

export const ListScreening = () => {
    const { roomId } = useParams();

    const [screening, setScreening] = useState<Screening[]>([]);
    const [cinema, setCinemas] = useState<Cinema[]>([]);
    const [movie, setMovies] = useState<Movie[]>([]);
    const [room, setRooms] = useState<Room[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [roomdetails, setRoomsDetails] = useState<RoomDetails>();

    useEffect(() => {
        const fetchData = async () => {
            setScreening(await listScreeningByRoomId(roomId));
        };
        fetchData();
    }, [roomId]);

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
            setRooms(await getAllRoom());
        };
        fetchData();
    }, [roomId]);
    useEffect(() => {
        const fetchData = async () => {
            setRoomsDetails(await detailRoom(roomId));
        };

        fetchData();
    }, [roomdetails]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    screening.map((sc) => {
        sc.startTime = convertToDateTimePublish(new Date(sc.startTime));
        sc.endTime = convertToDateTimePublish(new Date(sc.endTime));
        sc.movieName = movie.find((mv) => mv.id == sc.movieId)?.title ?? "";
        sc.cinemaName =
            cinema.find((cin) => cin.cinemaId == sc.cinemaId)?.name ?? "";
        sc.roomCode = room.find((rm) => rm.roomId == sc.roomId)?.roomCode ?? "";
    });

    return (
        <>
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "25px",
                    fontWeight: "bold",
                }}
            >
                Quản lý khung giờ chiếu của phòng {roomdetails?.roomCode}, rạp{" "}
                {roomdetails?.cinemaName}
            </h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Screening ID</TableCell>
                            <TableCell>Movie Name</TableCell>
                            <TableCell>Show Time</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {screening
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((sc) => (
                                <TableRow key={sc.screeningId}>
                                    <TableCell>{sc.screeningId}</TableCell>
                                    <TableCell>{sc.movieName}</TableCell>
                                    <TableCell>
                                        {sc.startTime} - {sc.endTime}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            href={`/admin/screening/details/${sc.screeningId}`}
                                            style={{ marginRight: "10px" }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            href={`/choosechair/${sc.screeningId}`}
                                        >
                                            Đặt vé
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={screening.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "16px",
                    width: "100%",
                }}
            >
                <span style={{ marginRight: "8px" }}>
                    Bạn muốn thêm mới khung giờ chiếu cho phòng{" "}
                    {roomdetails?.roomCode}, rạp {roomdetails?.cinemaName} , hãy
                    click vào đây
                </span>
                <a href={`/admin/screening/addscreening/${roomId}`}>
                    <Button variant="contained" color="primary">
                        Thêm mới
                    </Button>
                </a>
            </div>
        </>
    );
};
