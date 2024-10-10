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

export type MovieTypeShow = {
    id: number; // Hoặc string nếu bạn dùng UUID
    name: string;
};

export interface MovieShow {
    id: number; // ID của phim
    title: string; // Tên phim
    description: string; // Mô tả phim
    director: string; // Đạo diễn
    actors: string; // Diễn viên
    releaseDate: string; // Ngày phát hành (có thể là Date hoặc string tùy thuộc vào cách bạn xử lý)
    rating: number; // Đánh giá
    status: string; // Trạng thái phim (COMING_SOON, NOW_SHOWING, HIDDEN, ...)
    banner: string | null; // Đường dẫn hình ảnh (có thể là null)
    duration: number; // Thời gian phim (phút)
    trailer: string; // Đường dẫn đến trailer
    createdAt: string; // Ngày tạo
    updatedAt: string; // Ngày cập nhật
    types: Array<{ type: { id: number; name: string } }>; // Danh sách thể loại
}
