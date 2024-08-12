export const formatDate = (date: Date): string => {
    // Mảng các tên ngày trong tuần
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based in JavaScript

    const dayOfWeek = daysOfWeek[date.getDay()]; // Get the name of the day of the week

    return `${day < 10 ? `0${day}` : day}/${
        month < 10 ? `0${month}` : month
    } - ${dayOfWeek.toLowerCase()}`;
};
