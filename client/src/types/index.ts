export interface IUser {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
}

export interface IComment {
    _id: string;
    text: string;
    user: IUser;
    createdAt: string;
}

export interface IImage {
    _id: string;
    caption: string;
    imageUrl: string;
    uploaderId: IUser;
    likes: string[];
    comments: IComment[];
    createdAt: string;
}

export interface AuthResponse {
    token: string;
    user: IUser;
}

export interface ImageCardProps {
    image: IImage;
}

export interface ImageUploadProps {
    onUploadSuccess: () => void;
}