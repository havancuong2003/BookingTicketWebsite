import { useState, useEffect, useRef } from "react";
import banner1 from "../../../assets/img/banner1.jpg";
import banner2 from "../../../assets/img/banner2.jpg";
import banner3 from "../../../assets/img/banner3.jpg";
import logo from "../../../assets/img/logo.png";
import abc from "../../../assets/img/ABC.png";
import { Movie } from "..";
// import { useAuth } from "../../../contexts";

export const LandingPage = () => {
    const images = [banner1, banner2, banner3, logo, abc];
    const [currentIndex, setCurrentIndex] = useState(0);
    // const { userName } = useAuth(); // Lấy thông tin người dùng từ AuthContext
    const intervalRef = useRef<number | null>(null);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        startAutoSlide();

        return () => {
            stopAutoSlide();
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const startAutoSlide = () => {
        stopAutoSlide();
        intervalRef.current = window.setInterval(() => {
            handleNextImage();
        }, 2000);
    };

    const stopAutoSlide = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }
    };

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleGoToImage = (index: number) => {
        setCurrentIndex(index);
    };

    const handleButtonClick = (direction: "prev" | "next") => {
        stopAutoSlide();
        direction === "prev" ? handlePrevImage() : handleNextImage();
        restartAutoSlide();
    };

    const restartAutoSlide = () => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
            startAutoSlide();
        }, 3000);
    };

    return (
        <>
            <div className="relative w-full md:w-11/12 h-[300px] sm:h-[500px] md:h-[600px] mt-[150px] mb-[150px] mx-auto overflow-hidden">
                {/* {userName && (
                    <h1 className="text-3xl font-bold text-center">
                        HELLO {userName}
                    </h1>
                )} */}
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`banner-${index}`}
                            className="w-full h-[200px] sm:h-[500px] md:h-[600px] rounded-lg flex-shrink-0"
                        />
                    ))}
                </div>
                <button
                    onClick={() => handleButtonClick("prev")}
                    className="absolute top-1/3 xs:top-[100px] sm:top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-500 text-white rounded-full"
                >
                    &lt;
                </button>
                <button
                    onClick={() => handleButtonClick("next")}
                    className="absolute top-1/3 xs:top-[100px] sm:top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-500 text-white rounded-full"
                >
                    &gt;
                </button>
                <div className="absolute xs:top-2/3 sm:bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 p-2 bg-blue-400 rounded-full">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => {
                                handleGoToImage(index);
                                stopAutoSlide();
                                restartAutoSlide();
                            }}
                            className={`cursor-pointer w-3 h-3 rounded-full ${
                                currentIndex === index
                                    ? "bg-white"
                                    : "bg-gray-500"
                            }`}
                        ></span>
                    ))}
                </div>
            </div>
            <Movie />
        </>
    );
};
