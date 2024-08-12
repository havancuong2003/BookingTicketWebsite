const getDateOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(date.setDate(diff));
};

export const getAllDateOfWeek = (): Date[] => {
    const week: Date[] = [];
    const now = new Date(); // Use a new Date instance to avoid mutating the original one

    // Get the start of the week (Monday)
    const startOfWeek = getDateOfWeek(new Date(now));

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek); // Create a new Date instance for each day
        date.setDate(startOfWeek.getDate() + i);
        week.push(date);
    }

    return week;
};
