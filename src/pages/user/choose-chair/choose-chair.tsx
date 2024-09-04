import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Box, Typography } from "@mui/material";
import imgbgr from "../../../assets/img/seat-unselect-normal.png";
const socket = io("http://localhost:3001");

const seatData = [
    // Hàng A
    { seatId: 1, rowCode: "A", seatNumber: 1, seatType: 0, status: 0 },
    { seatId: 2, rowCode: "A", seatNumber: 2, seatType: 0, status: 0 },
    { seatId: 3, rowCode: "A", seatNumber: 3, seatType: 0, status: 0 },
    { seatId: 4, rowCode: "A", seatNumber: 4, seatType: 0, status: 0 },
    { seatId: 5, rowCode: "A", seatNumber: 5, seatType: 0, status: 0 },
    { seatId: 6, rowCode: "A", seatNumber: 6, seatType: 0, status: 0 },
    { seatId: 7, rowCode: "A", seatNumber: 7, seatType: 0, status: 0 },
    { seatId: 8, rowCode: "A", seatNumber: 8, seatType: 0, status: 0 },
    { seatId: 9, rowCode: "A", seatNumber: 9, seatType: 0, status: 0 },
    { seatId: 10, rowCode: "A", seatNumber: 10, seatType: 0, status: 0 },
    { seatId: 11, rowCode: "A", seatNumber: 11, seatType: 0, status: 0 },
    { seatId: 12, rowCode: "A", seatNumber: 12, seatType: 0, status: 0 },

    // Hàng B
    { seatId: 13, rowCode: "B", seatNumber: 1, seatType: 0, status: 0 },
    { seatId: 14, rowCode: "B", seatNumber: 2, seatType: 0, status: 0 },
    { seatId: 15, rowCode: "B", seatNumber: 3, seatType: 0, status: 0 },
    { seatId: 16, rowCode: "B", seatNumber: 4, seatType: 0, status: 0 },
    { seatId: 17, rowCode: "B", seatNumber: 5, seatType: 0, status: 0 },
    { seatId: 18, rowCode: "B", seatNumber: 6, seatType: 0, status: 0 },
    { seatId: 19, rowCode: "B", seatNumber: 7, seatType: 0, status: 0 },
    { seatId: 20, rowCode: "B", seatNumber: 8, seatType: 0, status: 0 },
    { seatId: 21, rowCode: "B", seatNumber: 9, seatType: 0, status: 0 },
    { seatId: 22, rowCode: "B", seatNumber: 10, seatType: 0, status: 0 },
    { seatId: 23, rowCode: "B", seatNumber: 11, seatType: 0, status: 0 },
    { seatId: 24, rowCode: "B", seatNumber: 12, seatType: 0, status: 0 },

    // Hàng C
    { seatId: 25, rowCode: "C", seatNumber: 1, seatType: 0, status: 0 },
    { seatId: 26, rowCode: "C", seatNumber: 2, seatType: 0, status: 0 },
    { seatId: 27, rowCode: "C", seatNumber: 3, seatType: 0, status: 0 },
    { seatId: 28, rowCode: "C", seatNumber: 4, seatType: 0, status: 0 },
    { seatId: 29, rowCode: "C", seatNumber: 5, seatType: 0, status: 0 },
    { seatId: 30, rowCode: "C", seatNumber: 6, seatType: 0, status: 0 },
    { seatId: 31, rowCode: "C", seatNumber: 7, seatType: 0, status: 0 },
    { seatId: 32, rowCode: "C", seatNumber: 8, seatType: 0, status: 0 },
    { seatId: 33, rowCode: "C", seatNumber: 9, seatType: 0, status: 0 },
    { seatId: 34, rowCode: "C", seatNumber: 10, seatType: 0, status: 0 },
    { seatId: 35, rowCode: "C", seatNumber: 11, seatType: 0, status: 0 },
    { seatId: 36, rowCode: "C", seatNumber: 12, seatType: 0, status: 0 },

    // Hàng D
    { seatId: 37, rowCode: "D", seatNumber: 1, seatType: 1, status: 0 },
    { seatId: 38, rowCode: "D", seatNumber: 2, seatType: 1, status: 0 },
    { seatId: 39, rowCode: "D", seatNumber: 3, seatType: 1, status: 0 },
    { seatId: 40, rowCode: "D", seatNumber: 4, seatType: 1, status: 0 },
    { seatId: 41, rowCode: "D", seatNumber: 5, seatType: 1, status: 0 },
    { seatId: 42, rowCode: "D", seatNumber: 6, seatType: 1, status: 0 },
    { seatId: 43, rowCode: "D", seatNumber: 7, seatType: 1, status: 0 },
    { seatId: 44, rowCode: "D", seatNumber: 8, seatType: 1, status: 0 },
    { seatId: 45, rowCode: "D", seatNumber: 9, seatType: 1, status: 0 },
    { seatId: 46, rowCode: "D", seatNumber: 10, seatType: 1, status: 0 },
    { seatId: 47, rowCode: "D", seatNumber: 11, seatType: 1, status: 0 },
    { seatId: 48, rowCode: "D", seatNumber: 12, seatType: 1, status: 0 },

    // Hàng E
    { seatId: 49, rowCode: "E", seatNumber: 1, seatType: 1, status: 0 },
    { seatId: 50, rowCode: "E", seatNumber: 2, seatType: 1, status: 0 },
    { seatId: 51, rowCode: "E", seatNumber: 3, seatType: 1, status: 0 },
    { seatId: 52, rowCode: "E", seatNumber: 4, seatType: 1, status: 0 },
    { seatId: 53, rowCode: "E", seatNumber: 5, seatType: 1, status: 0 },
    { seatId: 54, rowCode: "E", seatNumber: 6, seatType: 1, status: 0 },
    { seatId: 55, rowCode: "E", seatNumber: 7, seatType: 1, status: 0 },
    { seatId: 56, rowCode: "E", seatNumber: 8, seatType: 1, status: 0 },
    { seatId: 57, rowCode: "E", seatNumber: 9, seatType: 1, status: 0 },
    { seatId: 58, rowCode: "E", seatNumber: 10, seatType: 1, status: 0 },
    { seatId: 59, rowCode: "E", seatNumber: 11, seatType: 1, status: 0 },
    { seatId: 60, rowCode: "E", seatNumber: 12, seatType: 1, status: 0 },

    // Hàng F
    { seatId: 61, rowCode: "F", seatNumber: 1, seatType: 0, status: 0 },
    { seatId: 62, rowCode: "F", seatNumber: 2, seatType: 0, status: 0 },
    { seatId: 63, rowCode: "F", seatNumber: 3, seatType: 0, status: 0 },
    { seatId: 64, rowCode: "F", seatNumber: 4, seatType: 0, status: 0 },
    { seatId: 65, rowCode: "F", seatNumber: 5, seatType: 0, status: 0 },
    { seatId: 66, rowCode: "F", seatNumber: 6, seatType: 0, status: 0 },
    { seatId: 67, rowCode: "F", seatNumber: 7, seatType: 0, status: 0 },
    { seatId: 68, rowCode: "F", seatNumber: 8, seatType: 0, status: 0 },
    { seatId: 69, rowCode: "F", seatNumber: 9, seatType: 0, status: 0 },
    { seatId: 70, rowCode: "F", seatNumber: 10, seatType: 0, status: 0 },
    { seatId: 71, rowCode: "F", seatNumber: 11, seatType: 0, status: 0 },
    { seatId: 72, rowCode: "F", seatNumber: 12, seatType: 0, status: 0 },
];

export const ChooseChair = () => {
    const [status, setStatus] = useState(seatData);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    useEffect(() => {
        socket.on("statusUpdated", (data) => {
            setStatus((prevStatus) =>
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
        setStatus((prevStatus) =>
            prevStatus.map((item) =>
                item.seatId === id
                    ? {
                          ...item,
                          status: item.status === 0 ? 1 : 2,
                      }
                    : item
            )
        );

        const updatedItem = status.find((item) => item.seatId === id);
        if (updatedItem) {
            // Toggle seat selection
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
                status: updatedItem.status === 0 ? 1 : 2,
            });
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            {/* Seat Selection Area */}
            <Box
                sx={{
                    width: "70%",
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gap: 1,
                    margin: "20px",
                }}
            >
                {status.map((item) => (
                    <Box
                        key={item.seatId}
                        onClick={() => handleDivClick(item.seatId)}
                        sx={{
                            width: "50px",
                            height: "40px",
                            backgroundImage: `url("../../../assets/img/logo.png")`, // Ghế VIP cao hơn
                            backgroundColor:
                                item.status === 1
                                    ? "#03599D"
                                    : item.status === 2
                                    ? "#FD2802"
                                    : "#BABBC3", // Màu ghế VIP
                            color:
                                item.status === 1
                                    ? "white"
                                    : item.status === 2
                                    ? "white"
                                    : "black",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius:
                                item.seatType === 1
                                    ? "10px 10px 2px 2px"
                                    : "20px 20px 7px 7px", // Ghế VIP có góc bo nhiều hơn
                            border: "3px solid none",
                            cursor: "pointer",
                            position: "relative",
                            marginTop: "10px",
                            fontSize: "11px",

                            "&:before": {
                                content: '""',
                                position: "absolute",
                                bottom: "-10px",
                                left: 0,
                                width: "100%",
                                height: "10px",
                                backgroundColor: "inherit",
                                borderBottomLeftRadius: "50% 5px",
                                borderBottomRightRadius: "50% 5px",
                                zIndex: -1,
                            },
                            "&:hover": {
                                opacity: 0.8,
                                transform: "scale(1.05)",
                            },
                            transition:
                                "transform 0.2s ease, opacity 0.2s ease",
                        }}
                    >
                        <Typography variant="caption">
                            {item.rowCode}
                            {item.seatNumber}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Ticket Information Area */}
            <Box
                sx={{
                    width: "30%",
                    padding: 2,
                    border: "1px solid grey",
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ marginBottom: 2, textAlign: "center", width: "100%" }}
                >
                    Thông tin đặt vé
                </Typography>
                <Box sx={{ width: "100%" }}>
                    <Typography sx={{ marginBottom: 1 }}>User Id:</Typography>
                    <Typography sx={{ marginBottom: 1 }}>Tên:</Typography>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="subtitle1">
                            Ghế đã chọn:
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                marginTop: 1,
                            }}
                        >
                            {selectedSeats.length > 0 ? (
                                selectedSeats.map((seat, index) => (
                                    <Typography
                                        key={index}
                                        sx={{ marginRight: 1 }}
                                    >
                                        {seat}
                                    </Typography>
                                ))
                            ) : (
                                <Typography>Chưa chọn ghế nào</Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
