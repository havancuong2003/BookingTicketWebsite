import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
    Box,
    Typography,
    Paper,
    Grid,
    Container,
    Chip,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import { chooseChair, updateStatusSeat } from "../../../services";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:3001");

type Seat = {
    seatId: number;
    rowCode: string;
    seatNumber: number;
    seatType: number;
    status: number;
};

export const ChooseChair = () => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [seats, setSeats] = useState<Seat[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const id = useParams().id;

    const sortSeats = (seats: Seat[]) => {
        return seats.sort((a, b) => {
            if (a.rowCode !== b.rowCode) {
                return a.rowCode.localeCompare(b.rowCode);
            }
            return a.seatNumber - b.seatNumber;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const fetchedSeats = await chooseChair(id);
            setSeats(sortSeats(fetchedSeats));
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        socket.on("statusUpdated", (data) => {
            setSeats((prevStatus) =>
                prevStatus.map((item) =>
                    item.seatId === data.id
                        ? { ...item, status: data.status }
                        : item
                )
            );
        });

        return () => {
            socket.off("statusUpdated");
        };
    }, []);

    const handleDivClick = (id: number) => {
        const updatedItem = seats.find((item) => item.seatId === id);
        if (updatedItem) {
            if (updatedItem.status === 2) {
                setOpenSnackbar(true);
                return;
            }

            setSelectedSeats((prevSelectedSeats) => {
                const seatLabel = `${updatedItem.rowCode}${updatedItem.seatNumber}`;
                if (prevSelectedSeats.includes(seatLabel)) {
                    return prevSelectedSeats.filter(
                        (seat) => seat !== seatLabel
                    );
                } else {
                    return [...prevSelectedSeats, seatLabel];
                }
            });
            updateStatusSeat(id, { status: updatedItem.status === 0 ? 1 : 0 });
            socket.emit("updateStatus", {
                id: id,
                status: updatedItem.status === 0 ? 1 : 0,
            });
        }
    };

    const handleCloseSnackbar = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            textAlign={"center"}
                        >
                            Chọn ghế
                        </Typography>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(12, 1fr)",
                                gap: 1,
                            }}
                        >
                            {seats.map((item) => (
                                <Box
                                    key={item.seatId}
                                    onClick={() => handleDivClick(item.seatId)}
                                    sx={{
                                        width: "40px",
                                        height: "40px",
                                        color:
                                            item.status === 1
                                                ? "white"
                                                : item.status === 2
                                                ? "white"
                                                : "black",
                                        backgroundImage:
                                            item.seatType === 0
                                                ? item.status === 0
                                                    ? `url("/src/assets/img/seat-unselect-normal.png")`
                                                    : item.status === 1
                                                    ? `url("/src/assets/img/seat-select-normal.png")`
                                                    : `url("/src/assets/img/seat-buy-normal.png")`
                                                : item.status === 0
                                                ? `url("/src/assets/img/seat-unselect-vip.png")`
                                                : item.status === 1
                                                ? `url("/src/assets/img/seat-select-vip.png")`
                                                : `url("/src/assets/img/seat-buy-vip.png")`,
                                        backgroundSize: "cover",
                                        fontFamily: "SFProText",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor:
                                            item.status !== 2
                                                ? "pointer"
                                                : "not-allowed",
                                        opacity: item.status === 2 ? 0.5 : 1,
                                        transition:
                                            "transform 0.2s ease, opacity 0.2s ease",
                                        "&:hover": {
                                            transform:
                                                item.status !== 2
                                                    ? "scale(1.05)"
                                                    : "none",
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: "white",
                                            textShadow: "1px 1px 2px black",
                                        }}
                                    >
                                        {item.rowCode}
                                        {item.seatNumber}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            textAlign={"center"}
                        >
                            Thông tin đặt vé
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            User Id: {/* Add user ID here */}
                        </Typography>
                        <Typography sx={{ mb: 2 }}>
                            Tên: {/* Add user name here */}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Ghế đã chọn:
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mb: 2,
                            }}
                        >
                            {selectedSeats.length > 0 ? (
                                selectedSeats.map((seat, index) => (
                                    <Chip
                                        key={index}
                                        label={seat}
                                        color="primary"
                                    />
                                ))
                            ) : (
                                <Typography variant="body2" color={"blue"}>
                                    Chưa chọn ghế nào
                                </Typography>
                            )}
                        </Box>
                        <Button variant="contained" color="primary" fullWidth>
                            Xác nhận đặt vé
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="info"
                    sx={{ width: "100%" }}
                >
                    Ghế này đã được bán
                </Alert>
            </Snackbar>
        </Container>
    );
};
