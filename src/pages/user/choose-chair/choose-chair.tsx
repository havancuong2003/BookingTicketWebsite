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
    DialogActions,
    DialogContent,
    DialogContentText,
    IconButton,
    DialogTitle,
    Dialog,
} from "@mui/material";
import {
    chooseChair,
    getAllSeatByUser,
    getIdUser,
    getInforScreening,
    updateSeatsByUserToDefault,
    updateStatusSeat,
} from "../../../services";
import { useParams } from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

const socket = io("http://localhost:3001");

type Seat = {
    seatId: number;
    rowCode: string;
    seatNumber: number;
    seatType: number;
    status: number;
    userId: number;
};
type InforScreen = {
    cinemaName: string;
    movieName: string;
    duration: number;
    releaseDate: string;
    startTime: string;
    roomCode: string;
};

type UserInf = {
    id: number;
    firstName: string;
    email: string;
    role: number;
};

type SeatByUser = {
    seatId: number;
    rowCode: string;
    seatNumber: number;
};

const StyledDialog = styled(Dialog)({
    "& .MuiDialog-paper": {
        borderRadius: 8,
    },
});

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    margin: 0,
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
}));

export const ChooseChair = () => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [seats, setSeats] = useState<Seat[]>([]);
    const [inforScreening, setInforScreening] = useState<InforScreen>();
    const [seatsByUser, setSeatsByUser] = useState<SeatByUser[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [userData, setUserData] = useState<UserInf>();
    const [normalSeats, setNormalSeats] = useState(0);
    const [vipSeats, setVipSeats] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60 * 6); // 60 seconds = 1 minute
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [openLoginAlert, setOpenLoginAlert] = useState(false);

    const idScreening = useParams().idScreening;

    useEffect(() => {
        const getInforUser = async () => {
            try {
                const data = await getIdUser();
                console.log("data", data);

                if (!data) {
                    setOpenLoginAlert(true);
                    return;
                }

                updateSeatsByUserToDefault(data.id);
                const seatsByUser = await getAllSeatByUser(data.id);
                if (seatsByUser.length > 0) {
                    setSeats((prevSeats) =>
                        prevSeats.map((seat) => {
                            if (seat.userId === data.id && seat.status === 1) {
                                socket.emit("updateStatus", {
                                    id: seat.seatId,
                                    status: 0,
                                    userId: 0,
                                });
                                return { ...seat, status: 0, userId: 0 };
                            }
                            return seat;
                        })
                    );

                    setSelectedSeats([]);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setOpenLoginAlert(true);
            }
        };
        getInforUser();
    }, []);

    const handleLoginAlertClose = () => {
        setOpenLoginAlert(false);
        window.location.href = "/login";
    };

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
            const userIf = await getIdUser();
            console.log("userIf", userIf);

            setUserData(userIf);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedSeats = await chooseChair(idScreening);
            const filteredSeats = fetchedSeats.filter(
                (seat: Seat) =>
                    !(
                        seat.status === 3 &&
                        seat.userId === 1 &&
                        userData?.id !== 1
                    )
            );
            setSeats(sortSeats(filteredSeats));
        };
        fetchData();
    }, [idScreening, userData?.id]);

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

    useEffect(() => {
        const seatByUser = async () => {
            if (userData?.id) {
                const seatsByUser = await getAllSeatByUser(userData.id);
                setSeatsByUser(seatsByUser);
                if (seatsByUser.length > 0) {
                    const newSelectedSeats = seatsByUser
                        .filter((seat: SeatByUser) => {
                            const matchingSeat = seats.find(
                                (s) =>
                                    s.rowCode === seat.rowCode &&
                                    s.seatNumber === seat.seatNumber
                            );
                            return matchingSeat && matchingSeat.status === 1;
                        })
                        .map(
                            (seat: SeatByUser) =>
                                `${seat.rowCode}${seat.seatNumber}`
                        );

                    setSelectedSeats((prevSeats) => [
                        ...new Set([...prevSeats, ...newSelectedSeats]),
                    ]);
                }
            }
        };
        seatByUser();
    }, [userData?.id, seats]);

    useEffect(() => {
        const screening = async () => {
            const inforScreening = await getInforScreening(Number(idScreening));
            setInforScreening(inforScreening);
        };
        screening();
    }, [idScreening]);

    useEffect(() => {
        const normal = selectedSeats.filter((seat) =>
            seats.find(
                (s) =>
                    `${s.rowCode}${s.seatNumber}` === seat && s.seatType === 0
            )
        ).length;
        const vip = selectedSeats.filter((seat) =>
            seats.find(
                (s) =>
                    `${s.rowCode}${s.seatNumber}` === seat && s.seatType === 1
            )
        ).length;
        setNormalSeats(normal);
        setVipSeats(vip);
    }, [selectedSeats, seats]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        } else {
            setIsTimeUp(true);
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const handleTimeUpConfirm = () => {
        window.location.reload();
    };

    const handleDivClick = async (id: number) => {
        const updatedItem = seats.find((item) => item.seatId === id);
        if (updatedItem) {
            if (updatedItem.status === 2) {
                setOpenSnackbar(true);
                return;
            }

            // Kiểm tra nếu ghế đang được chọn bởi người dùng khác
            if (
                updatedItem.status === 1 &&
                updatedItem.userId !== Number(userData?.id)
            ) {
                setOpenSnackbar(true);
                return;
            }

            const newStatus = updatedItem.status === 0 ? 1 : 0;
            const newUserId = updatedItem.status === 0 ? userData?.id : null;

            try {
                await updateStatusSeat(id, {
                    status: Number(newStatus),
                    userId: Number(newUserId),
                });

                setSeats((prevSeats) =>
                    prevSeats.map((seat) =>
                        seat.seatId === id
                            ? ({
                                  ...seat,
                                  status: newStatus,
                                  userId: newUserId ?? 0,
                              } as Seat)
                            : seat
                    )
                );

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

                socket.emit("updateStatus", {
                    id: id,
                    status: newStatus,
                    userId: newUserId,
                });
            } catch (error) {
                console.error("Failed to update seat status:", error);
                setOpenSnackbar(true);
            }
        }
    };

    const handleCloseSnackbar = (
        _event?: React.SyntheticEvent | Event,
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
                        <Box
                            sx={{
                                mt: 2,
                                display: "flex",
                                justifyContent: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        backgroundImage: `url("/src/assets/img/seat-unselect-normal.png")`,
                                        backgroundSize: "cover",
                                        mr: 1,
                                    }}
                                />
                                <Typography variant="caption">
                                    Ghế trống
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        backgroundImage: `url("/src/assets/img/seat-select-normal.png")`,
                                        backgroundSize: "cover",
                                        mr: 1,
                                    }}
                                />
                                <Typography variant="caption">
                                    Ghế đã chọn
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        backgroundImage: `url("/src/assets/img/seat-buy-normal.png")`,
                                        backgroundSize: "cover",
                                        mr: 1,
                                    }}
                                />
                                <Typography variant="caption">
                                    Ghế đã bán
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "calc(100% - 16px)", // Adjust for the gap in the seat grid
                                height: "70px", // Increased height
                                marginTop: "20px",
                                backgroundImage:
                                    'url("/src/assets/img/ic-screen.png")',
                                backgroundSize: "100% 100%", // Changed to cover both width and height
                                backgroundRepeat: "no-repeat",
                                backgroundColor: "transparent !important",
                                backgroundPosition: "center",
                                mb: 2,
                                mx: "auto", // Center the screen
                            }}
                        />
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
                                            item.status === 0
                                                ? "black"
                                                : "white",
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
                                            color:
                                                item.status === 0
                                                    ? "black"
                                                    : "white",
                                            textShadow:
                                                item.status === 0
                                                    ? "none"
                                                    : "1px 1px 2px black",
                                        }}
                                    >
                                        {item.rowCode}
                                        {item.seatNumber}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                mt: 2,
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "flex-start",
                                borderTop: "1px solid #ccc",
                                pt: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    borderRight: "1px solid #ccc",
                                    pr: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            backgroundImage: `url("/src/assets/img/seat-unselect-normal.png")`,
                                            backgroundSize: "cover",
                                            mr: 1,
                                        }}
                                    />
                                    <Typography variant="subtitle2">
                                        Ghế thường
                                    </Typography>
                                </Box>{" "}
                                <Typography variant="body2" fontWeight="bold">
                                    {normalSeats > 0
                                        ? `${normalSeats} x 50.000đ`
                                        : "0"}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    borderRight: "1px solid #ccc",
                                    px: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            backgroundImage: `url("/src/assets/img/seat-unselect-vip.png")`,
                                            backgroundSize: "cover",
                                            mr: 1,
                                        }}
                                    />
                                    <Typography variant="subtitle2">
                                        Ghế VIP
                                    </Typography>
                                </Box>
                                <Typography variant="body2" fontWeight="bold">
                                    {vipSeats > 0
                                        ? `${vipSeats} x 80.000đ`
                                        : "0"}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    borderRight: "1px solid #ccc",
                                    px: 2,
                                }}
                            >
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    Tổng tiền
                                </Typography>
                                <Typography
                                    variant="body2"
                                    fontWeight="bold"
                                    color="primary"
                                >
                                    {(
                                        normalSeats * 50000 +
                                        vipSeats * 80000
                                    ).toLocaleString()}
                                    đ
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    pl: 2,
                                }}
                            >
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    Thời gian còn lại
                                </Typography>
                                <Typography
                                    variant="body2"
                                    fontWeight="bold"
                                    color="error"
                                >
                                    {formatTime(timeLeft)}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>{" "}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            textAlign={"center"}
                        >
                            Thông tin đặt vé
                        </Typography>
                        {userData ? (
                            <>
                                <Typography sx={{ mb: 1 }}>
                                    User Id: {userData?.id}
                                </Typography>
                                <Typography sx={{ mb: 2 }}>
                                    Tên: {userData.firstName}
                                </Typography>
                            </>
                        ) : (
                            <Typography sx={{ mb: 2 }}>
                                Đang tải thông tin người dùng...
                            </Typography>
                        )}
                        <Typography sx={{ mb: 2 }}>
                            Rạp chiếu: {inforScreening?.cinemaName}
                        </Typography>
                        <Typography sx={{ mb: 2 }}>
                            Ngày chiếu: {inforScreening?.releaseDate}
                        </Typography>
                        <Typography sx={{ mb: 2 }}>
                            Giờ chiếu: {inforScreening?.startTime}
                        </Typography>
                        <Typography sx={{ mb: 2 }}>
                            Phòng chiếu :{inforScreening?.roomCode}
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
                    {(() => {
                        const selectedSeat = seats.find(
                            (seat) => seat.status !== 0
                        );
                        if (selectedSeat) {
                            if (selectedSeat.status === 2) {
                                return "Ghế này đã được bán";
                            } else if (selectedSeat.status === 1) {
                                return "Ghế này đang có người chọn";
                            }
                        }
                        return "Không thể chọn ghế này";
                    })()}
                </Alert>
            </Snackbar>
            <StyledDialog
                open={isTimeUp}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: { borderRadius: 8 },
                }}
            >
                <StyledDialogTitle id="alert-dialog-title">
                    <WarningIcon />
                    Thời gian chờ đã hết
                    <IconButton
                        aria-label="close"
                        onClick={handleTimeUpConfirm}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </StyledDialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Thời gian chờ đã hết. Vui lòng tải lại trang để tiếp
                        tục.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleTimeUpConfirm}
                        color="primary"
                        variant="contained"
                        autoFocus
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </StyledDialog>
            <Dialog
                open={openLoginAlert}
                onClose={handleLoginAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Thông báo đăng nhập"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Người dùng không tồn tại, vui lòng đăng nhập lại.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleLoginAlertClose}
                        color="primary"
                        variant="contained"
                        autoFocus
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};
