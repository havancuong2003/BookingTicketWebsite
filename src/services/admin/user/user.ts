import axios from "axios";

export const listUser = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/getAll`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
// export const getInforbyEmail = async (email: string) => {
//     try {
//         const response = await axios.get(
//             `${import.meta.env.VITE_BACKEND_URL}/user/inforByEmail/${email}`
//         );
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// };

export const getIdUserbyEmail = async (email: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/idByEmail/${email}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
