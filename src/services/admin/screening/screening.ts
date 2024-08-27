import axios from "axios";

export const listScreening = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/screening/getAll`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
export const createScreening = async (data: any, navigate: any) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/screening/create`,
            data
        );
        console.log("screening added successfully:", response.data);
        navigate("/admin/screening/listscreening");
    } catch (error) {
        console.log(data);
        console.error("Error adding screening:", error, data);
    }
};
export const updateScreeing = async (data: any, id: any, navigate: any) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/screening/update/${id}`,
            data
        );
        console.log("room updated successfully:", response.data);
        navigate("/admin/screening/listscreening");
    } catch (error) {
        console.log(data);
        console.error("Error updated room:", error, data);
    }
};
export const detailScreeing = async (id: any) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/screening/details/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const convertToDateTimeLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};
