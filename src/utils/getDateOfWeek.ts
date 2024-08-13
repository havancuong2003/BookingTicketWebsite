export const getAllDateOfWeek = (): Date[] => {
    const week: Date[] = [];
    const now = new Date(); // Ngày hiện tại

    for (let i = 0; i < 7; i++) {
        const date = new Date(now); // Tạo một đối tượng Date mới cho mỗi ngày
        date.setDate(now.getDate() + i);
        week.push(date);
    }

    return week;
};
