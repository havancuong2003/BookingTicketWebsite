import { useState, useEffect } from "react";
import { formatDate, getAllDateOfWeek } from "../../../utils";
import img from "../../../assets/img/ABC.png";
import clsx from "clsx";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
type Movie = {
    id: number;
    name: string;
    image: string;
    duration: string;
    description: string;
    type?: string[]; // Khai báo kiểu mảng chứa chuỗi
    subtitleStyle?: string[]; // Có thể là chuỗi hoặc không có giá trị
    showTime?: {
        // Khai báo kiểu đối tượng trong mảng
        time: string;
        emptySeats: number;
    }[];
};
type MovieProps = {
    classes?: {
        [key: string]: string;
    };
};
const movies: Movie[] = [
    {
        id: 1,
        name: "Movie 1",
        image: img,
        duration: "2h 30m",
        description: "A thrilling horror movie with unexpected twists.",
        type: ["Kinh di", "Hanh dong"],
        subtitleStyle: ["2D", "Lồng tiếng"],
        showTime: [
            { time: "10:00 AM", emptySeats: 20 },
            { time: "1:00 PM", emptySeats: 15 },
            { time: "4:00 PM", emptySeats: 5 },
            { time: "6:00 PM", emptySeats: 30 },
            { time: "3:00 PM", emptySeats: 25 },
            { time: "6:00 PM", emptySeats: 30 },
            { time: "3:00 PM", emptySeats: 25 },
            { time: "6:00 PM", emptySeats: 30 },
            { time: "3:00 PM", emptySeats: 25 },
            { time: "6:00 PM", emptySeats: 30 },
            { time: "3:00 PM", emptySeats: 25 },
        ],
    },
    {
        id: 2,
        name: "Movie 2",
        image: img,
        duration: "1h 45m",
        description: "A romantic comedy that will make you laugh and cry.",
        type: ["Tinh yeu", "Hai huoc"],
        subtitleStyle: ["2D", "Vietsub"],
        showTime: [
            { time: "11:00 AM", emptySeats: 30 },
            { time: "2:00 PM", emptySeats: 25 },
        ],
    },
    {
        id: 3,
        name: "Movie 3",
        image: img,
        duration: "2h 15m",
        description: "An animated film filled with adventure and fun.",
        type: ["Phim hoat hinh"],
        subtitleStyle: ["3D", "Lồng tiếng"],
        showTime: [
            { time: "12:00 PM", emptySeats: 40 },
            { time: "3:00 PM", emptySeats: 10 },
        ],
    },
    {
        id: 4,
        name: "Movie 4",
        image: img,
        duration: "2h 10m",
        description:
            "A dramatic film exploring deep emotions and relationships.",
        type: ["Drama", "Tinh yeu"],
        subtitleStyle: ["3D", "Vietsub", "EngSub"],
        showTime: [
            { time: "9:00 AM", emptySeats: 12 },
            { time: "6:00 PM", emptySeats: 8 },
        ],
    },
    {
        id: 5,
        name: "Movie 5",
        image: img,
        duration: "1h 50m",
        description: "A sci-fi thriller with cutting-edge visual effects.",
        type: ["Kinh di", "Khoa hoc"],
        subtitleStyle: ["2D", "Lồng tiếng"],
        showTime: [
            { time: "5:00 PM", emptySeats: 18 },
            { time: "8:00 PM", emptySeats: 22 },
        ],
    },
    {
        id: 6,
        name: "Movie 6",
        image: img,
        duration: "2h 5m",
        description: "A heartwarming story of friendship and courage.",
        type: ["Tinh yeu", "Hanh dong"],
        subtitleStyle: ["2D", "Lồng tiếng"],
        showTime: [
            { time: "7:00 PM", emptySeats: 17 },
            { time: "9:30 PM", emptySeats: 13 },
        ],
    },
    {
        id: 7,
        name: "Movie 7",
        image: img,
        duration: "1h 40m",
        description: "A historical epic with breathtaking cinematography.",
        type: ["Lich su", "Hanh dong"],
        subtitleStyle: ["2D", "Lồng tiếng"],
        showTime: [
            { time: "3:00 PM", emptySeats: 25 },
            { time: "6:00 PM", emptySeats: 30 },
            { time: "3:00 PM", emptySeats: 25 },
            { time: "6:00 PM", emptySeats: 30 },
            { time: "3:00 PM", emptySeats: 25 },
            { time: "6:00 PM", emptySeats: 30 },
            { time: "3:00 PM", emptySeats: 25 },
            { time: "6:00 PM", emptySeats: 30 },
            { time: "3:00 PM", emptySeats: 25 },
            { time: "6:00 PM", emptySeats: 30 },
            { time: "3:00 PM", emptySeats: 25 },
            { time: "6:00 PM", emptySeats: 30 },
            { time: "3:00 PM", emptySeats: 25 },
            { time: "6:00 PM", emptySeats: 30 },
            { time: "3:00 PM", emptySeats: 25 },
            { time: "6:00 PM", emptySeats: 30 },
            { time: "3:00 PM", emptySeats: 25 },
            { time: "6:00 PM", emptySeats: 30 },
        ],
    },
    {
        id: 8,
        name: "Movie 8",
        image: img,
        duration: "2h 20m",
        description:
            "A fantasy adventure with magical creatures and epic battles.",
        type: ["Phieu luu", "Hanh dong"],
        subtitleStyle: ["2D", "Lồng tiếng"],
        showTime: [
            { time: "4:00 PM", emptySeats: 14 },
            { time: "7:00 PM", emptySeats: 9 },
        ],
    },
];

export const Schedule: React.FC<MovieProps> = ({ classes }) => {
    // Lưu ngày được chọn, khởi tạo với ngày hiện tại
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };
    return (
        <>
            <div className="flex justify-center flex-wrap">
                {getAllDateOfWeek().map((date) => {
                    const isSelected =
                        date.toDateString() === selectedDate.toDateString();

                    return (
                        <div
                            key={date.toString()}
                            className={`m-4 p-6 bg-slate-100 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer ${
                                isSelected
                                    ? "border-b-4 border-blue-500 bg-[#51d1ee]"
                                    : ""
                            }`}
                            onClick={() => handleDateClick(date)}
                        >
                            <h1
                                className={`text-xl font-semibold ${
                                    isSelected ? "text-black" : "text-gray-800"
                                }`}
                            >
                                {formatDate(date)}
                            </h1>
                        </div>
                    );
                })}
            </div>
            <div className="my-20 w-full flex flex-col items-center">
                {/* Movie đầu tiên */}
                <div className="w-full mb-10 flex flex-col items-center">
                    <div className="flex flex-col sm:flex-row w-9/12">
                        <div className="w-full sm:w-4/12">
                            <img
                                src={movies[0].image}
                                alt={movies[0].name}
                                className="w-[350px] h-[550px] rounded-3xl"
                            />
                        </div>
                        <div className="w-full sm:w-8/12 p-4">
                            <div className="text-xl font-bold">
                                <span
                                    className={clsx(
                                        classes?.movieName,
                                        "text-5xl"
                                    )}
                                >
                                    {movies[0].name}
                                </span>
                            </div>
                            <div className="sm:mt-5">
                                <LocalOfferIcon className="mr-2" />
                                <span className="text-lg">
                                    {movies[0].type?.join(", ")}
                                </span>
                            </div>
                            <div className="mt-2 mb-3 sm:mt-3 sm:mb-10">
                                <AccessTimeIcon />
                                <span className="text-lg ml-1 mt-5">
                                    {movies[0].duration}
                                </span>
                            </div>
                            <div className="mb-8">
                                {movies[0].subtitleStyle?.map((st) => (
                                    <span
                                        key={st}
                                        className="font-bold text-2xl mr-2"
                                    >
                                        {st} <span>|</span>
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 grid grid-cols-2  lg:grid-cols-4 xl:grid-cols-5">
                                {movies[0].showTime?.map((time, index) => (
                                    <div key={index} className="mb-2 ">
                                        <div className="bg-gray-300 text-black w-32 p-4 text-xl">
                                            {time.time}
                                        </div>
                                        <div className="p-4">
                                            {time.emptySeats} ghế trống
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Các movie còn lại */}
                <div className="w-9/12 ">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {movies.slice(1).map((movie) => (
                            <div
                                key={movie.id}
                                className="flex flex-col sm:flex-row"
                            >
                                <div className="w-full sm:w-4/12">
                                    <img
                                        src={movie.image}
                                        alt={movie.name}
                                        className="w-full h-auto object-cover rounded-3xl"
                                    />
                                </div>
                                <div className="w-full sm:w-8/12 p-4">
                                    <div className="text-xl font-bold  ">
                                        <span
                                            className={clsx(
                                                classes?.movieName,
                                                "text-2xl"
                                            )}
                                        >
                                            {movie.name}
                                        </span>
                                    </div>
                                    <div className="mt-2">
                                        {movie.type?.join(", ")}{" "}
                                        <span>{movie.duration}</span>
                                    </div>
                                    <div className="mt-2">
                                        {movie.subtitleStyle?.map((st) => (
                                            <span
                                                key={st}
                                                className="font-bold text-lg mr-3"
                                            >
                                                {st} <span>|</span>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4">
                                        {movie.showTime?.map((time, index) => (
                                            <div key={index} className="mb-2">
                                                <div className="bg-gray-300 text-black w-24 p-3">
                                                    {time.time}
                                                </div>
                                                <div className="text-sm p-3">
                                                    {time.emptySeats} ghế trống
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
