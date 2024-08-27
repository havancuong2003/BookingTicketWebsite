import axios from "axios";
import { useEffect, useState } from "react";

type Room = {
    roomId: number;
    roomCode: string;
    cinemaId: number;
    cinemaName: string;
};
export const ListRoom = () => {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/room/getAll`
                );
                setRooms(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    console.log("room:", rooms);

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>List Rooms</h1>
            {rooms.map((room) => (
                <div
                    key={room.roomId}
                    style={{
                        display: "flex",
                        marginBottom: "20px",
                        padding: "10px",
                    }}
                >
                    <div style={{ flex: 1, paddingRight: "20px" }}>
                        <h2>{room.roomId}</h2>
                        <p>
                            <strong>Room Code:</strong> {room.roomCode}
                        </p>

                        <p>
                            <strong>Cinema Id:</strong> {room.cinemaId}
                        </p>
                        <p>
                            <strong>Cinema name:</strong> {room.cinemaName}
                        </p>

                        <a
                            href={`/admin/room/details/${room.roomId}`}
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
