import { useEffect, useState } from "react";
import { listCinema } from "../../../../services";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
} from "@mui/material"; // Thêm import MUI
import { Button } from "@mui/material";

type Cinema = {
    cinemaId: number;
    name: string;
    location: string;
    totalScreens: number;
    createdAt: String;
    updatedAt: String;
};

export const ListCinema = () => {
    const [cinemas, setCinemas] = useState<Cinema[]>([]);
    const [page, setPage] = useState(0); // Thêm state cho trang
    const [rowsPerPage, setRowsPerPage] = useState(10); // Số dòng mỗi trang

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage); // Cập nhật trang
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10)); // Cập nhật số dòng mỗi trang
        setPage(0); // Đặt lại trang về 0
    };

    useEffect(() => {
        const fetchData = async () => {
            setCinemas(await listCinema());
        };
        fetchData();
    }, [cinemas]);

    return (
        <>
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "25px",
                    fontWeight: "bold",
                }}
            >
                Quản lý rạp chiếu
            </h1>
            <TableContainer style={{ width: "100%" }}>
                {" "}
                {/* Set width to 100% */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên rạp</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Số phòng chiếu</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                            <TableCell>Ngày sửa</TableCell>
                            <TableCell>Chức năng</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cinemas
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((cinema) => (
                                <TableRow key={cinema.cinemaId}>
                                    <TableCell>{cinema.name}</TableCell>
                                    <TableCell>{cinema.location}</TableCell>
                                    <TableCell>{cinema.totalScreens}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            cinema.createdAt as string
                                        ).toLocaleDateString("vi-VN", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            cinema.updatedAt as string
                                        ).toLocaleDateString("vi-VN", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "5px",
                                            }}
                                        >
                                            {" "}
                                            {/* Use flexbox for alignment */}
                                            <a
                                                href={`/admin/cinema/details/${cinema.cinemaId}`}
                                                className="button btn-primary"
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Sửa
                                                </Button>
                                            </a>
                                            <a
                                                href={`/admin/room/listroom/${cinema.cinemaId}`}
                                                className="button btn-primary"
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Quản lý phòng chiếu
                                                </Button>
                                            </a>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={cinemas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
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
                    Bạn muốn thêm mới rạp chiếu, hãy click vào đây
                </span>
                <a href={`/admin/cinema/addcinema`}>
                    <Button variant="contained" color="primary">
                        Thêm mới
                    </Button>
                </a>
            </div>
        </>
    );
};
