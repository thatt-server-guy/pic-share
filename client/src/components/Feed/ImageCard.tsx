import React from 'react';

interface ImageCardProps {
    imageUrl: string;
    caption: string;
    likes: number;
    onLike: () => void;
    onComment: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, caption, likes, onLike, onComment }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-md">
            <img src={imageUrl} alt={caption} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{caption}</h3>
                <div className="flex justify-between items-center mt-2">
                    <button onClick={onLike} className="text-blue-500">
                        Like {likes}
                    </button>
                    <button onClick={onComment} className="text-blue-500">
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCard;