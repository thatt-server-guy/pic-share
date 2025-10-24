export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
}

export interface Image {
    id: string;
    url: string;
    caption: string;
    uploaderId: string;
    uploadDate: Date;
    likes: number;
    comments: Comment[];
}

export interface Comment {
    id: string;
    imageId: string;
    userId: string;
    text: string;
    createdAt: Date;
}

export interface AuthResponse {
    token: string;
    user: User;
}