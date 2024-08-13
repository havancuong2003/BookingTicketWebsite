import { useState, useEffect } from "react";
import { formatDate, getAllDateOfWeek } from "../../../utils";
export const Schedule = () => {
    // Lưu ngày được chọn, khởi tạo với ngày hiện tại
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };
    return (
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
    );
};
