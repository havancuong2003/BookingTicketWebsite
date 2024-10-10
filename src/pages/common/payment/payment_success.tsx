import { useEffect, useState } from "react";
import {
    findSeatsBookingByUserId,
    getIdUser,
    getInforBookingComboByPaymentId,
    getPaymentByPaymentId,
    getPaymentDetailByPaymentId,
    sendPaymentSuccess,
    updatePayment,
    updateSeatsDoneByUserId,
} from "../../../services";
import { io } from "socket.io-client";
import { returnVNPay } from "../../../services";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from "@mui/material";

type Seat = {
    seatId: number;
    rowCode: string;
    seatNumber: number;
    seatType: number;
    status: number;
    userId: number;
};
type Payment = {
    paymentDate: string;
    totalAmount: number;
    movieTitle: string;
    cinemaName: string;
    roomCode: string;
};
type PaymentDetail = {
    seatId: number;
    rowCode: string;
    seatNumber: number;
    price: number;
};
type bookingCombo = {
    quantity: number;
    comboPrice: number;
    comboName: string;
};

export function PaymentSuccess() {
    const socket = io("http://localhost:3001");
    const [data, setData] = useState<any>(null);
    const [paymentDetail, setPaymentDetail] = useState<PaymentDetail[]>([]);
    const [paymentInfor, setPaymentInfor] = useState<Payment>();
    const [bookingCombo, setBookingCombo] = useState<bookingCombo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const responseData = await returnVNPay();
            setData(responseData);
            setLoading(false);
            if (responseData.vnp_ResponseCode === "00") {
                try {
                    const user = await getIdUser();
                    await updatePayment(responseData?.vnp_OrderInfo);
                    await updateSeatsDoneByUserId(user.id);
                    const seatsByUser = await findSeatsBookingByUserId(user.id);
                    if (seatsByUser.length > 0) {
                        seatsByUser.forEach((seat: Seat) => {
                            socket.emit("updateStatus", {
                                id: seat.seatId,
                                status: 2,
                                userId: user.id,
                            });
                        });
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            } else {
                try {
                    const user = await getIdUser();
                    const seatsByUser = await findSeatsBookingByUserId(user.id);

                    if (seatsByUser.length > 0) {
                        seatsByUser.forEach((seat: Seat) => {
                            socket.emit("updateStatus", {
                                id: seat.seatId,
                                status: 0,
                                userId: null,
                            });
                        });
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            }
        };

        fetchData();
    }, []);
    const paymentId = Number(data?.vnp_OrderInfo);
    console.log("paymentId", paymentId);

    useEffect(() => {
        const getPaymentDetail = async () => {
            setPaymentDetail(await getPaymentDetailByPaymentId(paymentId));
        };
        getPaymentDetail();
    }, [paymentId]);

    useEffect(() => {
        const getInforBookingCombo = async () => {
            setBookingCombo(await getInforBookingComboByPaymentId(paymentId));
        };
        getInforBookingCombo();
    }, [paymentId]);

    useEffect(() => {
        const getPaymentInfor = async () => {
            setPaymentInfor(await getPaymentByPaymentId(paymentId));
        };
        if (data?.vnp_ResponseCode === "00") {
            sendPaymentSuccess(paymentId);
        }
        getPaymentInfor();
    }, [paymentId]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).format(date);
    };

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString("vi-VN") + "đ";
    };

    useEffect(() => {
        const updateStatusSeatSocket = async () => {
            try {
                const user = await getIdUser();
                const seatsByUser = await findSeatsBookingByUserId(user.id);

                if (seatsByUser.length > 0) {
                    seatsByUser.forEach((seat: Seat) => {
                        socket.emit("updateStatus", {
                            id: seat.seatId,
                            status: 0,
                            userId: null,
                        });
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        updateStatusSeatSocket();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Paper
            style={{
                padding: "20px",
                margin: "20px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
            }}
        >
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                style={{ fontWeight: "bold", color: "#333" }}
            >
                Thanh toán đơn hàng số {data?.vnp_OrderInfo}
                {data?.vnp_ResponseCode === "00" ? " thành công" : " thất bại"}
            </Typography>
            <Typography
                variant="h6"
                style={{
                    color: data?.vnp_ResponseCode === "00" ? "green" : "red",
                }}
            >
                Trạng thái: {data?.vnp_ResponseCode}
            </Typography>
            <Typography
                variant="h6"
                style={{ fontStyle: "italic", color: "#555" }}
            >
                Hóa đơn: {data?.vnp_TxnRef}
            </Typography>
            <Typography
                variant="h6"
                style={{ fontStyle: "italic", color: "#555" }}
            >
                Phim chiếu: {paymentInfor?.movieTitle}
            </Typography>
            <Typography
                variant="h6"
                style={{ fontStyle: "italic", color: "#555" }}
            >
                Phòng chiếu: {paymentInfor?.roomCode}
            </Typography>
            <Typography
                variant="h6"
                style={{ fontStyle: "italic", color: "#555" }}
            >
                Rạp chiếu: {paymentInfor?.cinemaName}
            </Typography>
            <Typography variant="h6" style={{ marginBottom: "10px" }}>
                Ngày thanh toán:{" "}
                {paymentInfor ? formatDate(paymentInfor.paymentDate) : ""}
            </Typography>

            {bookingCombo.length > 0 && (
                <div>
                    <Typography variant="h6" style={{ marginBottom: "10px" }}>
                        Combo ưu đãi:
                    </Typography>
                    {bookingCombo.map((combo, index) => (
                        <Typography key={index} variant="body1">
                            {combo.comboName}:{" "}
                            {formatCurrency(combo.comboPrice)}, số lượng:{" "}
                            {combo.quantity}
                        </Typography>
                    ))}
                </div>
            )}

            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ghế</TableCell>
                            <TableCell>Hàng</TableCell>
                            <TableCell>Giá</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paymentDetail.map((detail, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {detail.rowCode}
                                    {detail.seatNumber}
                                </TableCell>
                                <TableCell>{detail.rowCode}</TableCell>
                                <TableCell>
                                    {formatCurrency(detail.price)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography
                variant="h6"
                style={{ fontWeight: "bold", color: "#000" }}
            >
                Tổng tiền:{" "}
                {paymentInfor ? formatCurrency(paymentInfor.totalAmount) : ""}
            </Typography>
        </Paper>
    );
}
