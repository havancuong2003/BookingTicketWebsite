import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useAuth } from "../../../contexts";

type SeatData = {
    seat: string[];
    seatAvailable: string[];
    seatReserved: string[];
    seatChoosed: string[];
};

export const ChooseChair = () => {
    const seatData: SeatData = {
        seat: [
            "A1",
            "A2",
            "A3",
            "A4",
            "A5",
            "A6",
            "A7",
            "A8",
            "A9",
            "A10",
            "A11",
            "A12",
            "B1",
            "B2",
            "B3",
            "B4",
            "B5",
            "B6",
            "B7",
            "B8",
            "B9",
            "B10",
            "B11",
            "B12",
            "K1",
            "K2",
            "K3",
            "K4",
            "K5",
            "K6",
            "K7",
            "K8",
            "K9",
            "K10",
            "K11",
            "K12",
        ],
        seatAvailable: [
            "A1",
            "A2",
            "A3",
            "A4",
            "A5",
            "A6",
            "A7",
            "A8",
            "A9",
            "A10",
            "A11",
            "A12",
            "B1",
            "B2",
            "B3",
            "B4",
            "B5",
            "B6",
            "B7",
            "B8",
            "B9",
            "B10",
            "B11",
            "B12",
            "K1",
            "K2",
            "K3",
            "K4",
            "K5",
            "K6",
            "K7",
            "K8",
            "K9",
            "K10",
            "K11",
            "K12",
        ],
        seatReserved: [],
        seatChoosed: [],
    };
    const a = useAuth();
    console.log(a.user);

    const [seatChoosed, setSeatChoosed] = useState<string[]>(
        seatData.seatChoosed
    );

    const onClickData = (seat: string) => {
        if (!seatChoosed.includes(seat)) {
            setSeatChoosed([...seatChoosed, seat]);
        } else {
            setSeatChoosed(seatChoosed.filter((s) => s !== seat));
        }
    };

    const isAvailable = (seat: string) => seatData.seatAvailable.includes(seat);
    const isReserved = (seat: string) => seatData.seatReserved.includes(seat);
    const isChoosed = (seat: string) => seatChoosed.includes(seat);

    return (
        <>
            <h1 style={{ textAlign: "center" }}>
                {/* Thong tin user: {userName} id: {userId} */}
            </h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "80% 20%",
                    margin: "0 auto",
                    padding: "20px",
                    height: "100vh",
                }}
            >
                <div style={{ marginTop: "20px", overflowY: "auto" }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(12, 1fr)",
                            gap: "1rem",
                        }}
                    >
                        {seatData.seat.map((item, index) => (
                            <Box
                                key={index}
                                onClick={() =>
                                    isAvailable(item) && onClickData(item)
                                }
                                sx={{
                                    backgroundColor: isChoosed(item)
                                        ? "#ffcc00"
                                        : isReserved(item)
                                        ? "#e60000"
                                        : "#b3b3b3",
                                    cursor: isReserved(item)
                                        ? "not-allowed"
                                        : "pointer",
                                    "&:hover": {
                                        backgroundColor:
                                            !isReserved(item) &&
                                            !isChoosed(item)
                                                ? "#00b33c"
                                                : undefined,
                                    },
                                    width: 30,
                                    height: 40,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "20px 20px 10px 10px",
                                    position: "relative",
                                    color: "white",
                                    fontWeight: "bold",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                    border: "1px solid #333",
                                    clipPath:
                                        "polygon(0% 0%, 100% 0%, 100% 70%, 90% 100%, 5% 100%, 0% 70%)",
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: "-10px",
                                        left: 0,
                                        right: 0,
                                        height: "10px",
                                        backgroundColor: "#333",
                                        borderRadius: "0 0 10px 10px",
                                    },
                                }}
                            >
                                {item}
                            </Box>
                        ))}
                    </div>

                    <ul
                        style={{
                            listStyle: "none",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                            padding: "0",
                        }}
                    >
                        <li
                            style={{
                                marginRight: "15px",
                                padding: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: "#b3b3b3",
                                    borderRadius: "50%",
                                    marginRight: "8px",
                                }}
                            />
                            Ghế thường
                        </li>
                        <li
                            style={{
                                marginRight: "15px",
                                padding: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: "#ffcc00",
                                    borderRadius: "50%",
                                    marginRight: "8px",
                                }}
                            />
                            Ghế đang chọn
                        </li>
                        <li
                            style={{
                                marginRight: "15px",
                                padding: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: "#e60000",
                                    borderRadius: "50%",
                                    marginRight: "8px",
                                }}
                            />
                            Ghế đã chọn
                        </li>
                        <li
                            style={{
                                marginRight: "15px",
                                padding: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 20,
                                    height: 20,
                                    border: "1px dashed #999",
                                    borderRadius: "50%",
                                    marginRight: "8px",
                                }}
                            />
                            Lối đi
                        </li>
                    </ul>
                </div>

                <div
                    style={{
                        padding: "20px",
                        backgroundColor: "#f5f5f5",
                        borderLeft: "1px solid #ccc",
                    }}
                >
                    <h3>Thông tin:</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li
                            style={{
                                marginBottom: "10px",
                                padding: "10px",
                                borderRadius: "8px",
                            }}
                        >
                            {/* User Id: {userId} */}
                        </li>
                        <li
                            style={{
                                marginBottom: "10px",
                                padding: "10px",
                                borderRadius: "8px",
                            }}
                        >
                            {/* Tên: {userName} */}
                        </li>
                    </ul>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {seatChoosed.map((seat) => (
                            <li
                                key={seat}
                                style={{
                                    marginBottom: "10px",
                                    padding: "10px",
                                    backgroundColor: "#e0e0e0",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                Ghế: {seat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Button variant="contained" id="cinema-back">
                    Quay lại
                </Button>
                <Button variant="contained" id="cons-chose">
                    Chọn Đồ Ăn
                </Button>
                <Button
                    variant="contained"
                    id="cinema-next"
                    style={{
                        borderRadius: "30px 0px 30px 30px",
                        opacity: "0.5",
                        pointerEvents: "none",
                    }}
                >
                    Thanh toán
                </Button>
            </div>
        </>
    );
};
