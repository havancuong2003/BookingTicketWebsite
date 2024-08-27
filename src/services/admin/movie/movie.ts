import axios from "axios";
// const navigate = useNavigate();
export const getIDMovieAfterUpload = async (
    accessToken: string,
    formData: FormData
) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/auth/upload`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log("Video uploaded successfully:", data);
            return data; // Return video ID
        } else {
            console.error("Failed to upload video:", await response.text());
            return null;
        }
    } catch (error) {
        console.error("Error uploading video:", error);
        return null;
    }
};

export const createMovie = async (movieData: any, navigate: any) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/movie/create`,
            movieData
        );
        console.log("Movie added successfully:", response.data);
        navigate("/admin/listmovie");
    } catch (error) {
        console.error("Error adding movie:", error);
    }
};

export const listMovie = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/movie/getAll`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const detailMovie = async (id: number) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/movie/details/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
