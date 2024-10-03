import { useEffect, useState } from "react";
import { detailCinema, listRoom } from "../../../../services";
import { useParams } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Button,
} from "@mui/material"; // Import MUI components

type Room = {
    roomId: number;
    roomCode: string;
    cinemaId: number;
    cinemaName: string;
};
type CinemaDetails = {
    cinemaId: number;
    name: string;
    location: string;
    totalScreens: number;
    createdAt: String;
    updatedAt: String;
};
export const ListRoom = () => {
    const { cinemaId } = useParams();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [cinemadetails, SetCinemaDetails] = useState<CinemaDetails>();

    useEffect(() => {
        const fetchData = async () => {
            setRooms(await listRoom(cinemaId));
        };
        fetchData();
    }, [cinemaId]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await detailCinema(cinemaId);
            SetCinemaDetails(data);
        };
        fetchData();
    }, []);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "25px",
                    fontWeight: "bold",
                }}
            >
                Quản lý phòng chiếu của rạp {cinemadetails?.name}
            </h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Room ID</TableCell>
                            <TableCell>Room Code</TableCell>

                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((room) => (
                                <TableRow key={room.roomId}>
                                    <TableCell>{room.roomId}</TableCell>
                                    <TableCell>{room.roomCode}</TableCell>

                                    <TableCell>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "5px",
                                            }}
                                        >
                                            <Button
                                                href={`/admin/room/details/${room.roomId}`}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                href={`/admin/screening/listscreening/${room.roomId}`}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Quản lý khung giờ chiếu
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={rooms.length}
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
                    Bạn muốn thêm mới phòng chiếu cho rạp {cinemadetails?.name},
                    hãy click vào đây
                </span>
                <a href={`/admin/room/addroom/${cinemaId}`}>
                    <Button variant="contained" color="primary">
                        Thêm mới
                    </Button>
                </a>
            </div>
        </div>
    );
};
