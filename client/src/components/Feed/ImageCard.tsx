import React from 'react';
import { Link } from 'react-router-dom';
import { IImage } from '../../types';

interface ImageCardProps {
    image: IImage;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
    return (
        <Link to={`/images/${image._id}`} className="block">
            <div className="rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img 
                    src={image.imageUrl} 
                    alt={image.caption}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                />
                <div className="px-6 py-4">
                    <p className="text-gray-700 text-base truncate">{image.caption}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                        <span>{image.likes.length} likes</span>
                        <span className="mx-2">•</span>
                        <span>{image.comments.length} comments</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ImageCard;