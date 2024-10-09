export type MovieType = {
    id: number; // Hoặc string nếu bạn dùng UUID
    name: string;
};

export type Movie = {
    id?: number;
    title: string;
    description: string;
    director: string;
    actors: string;
    releaseDate: string;
    trailer: string;
    rating: number;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    banner?: string; // New property for the banner image link
    types?: {
        type: MovieType; // Cập nhật đây để phản ánh cấu trúc mới
    }[]; // Thay đổi kiểu dữ liệu của types
};
