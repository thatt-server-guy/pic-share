import React from 'react';
import { IImage } from '../../types';
import ImageCard from './ImageCard';

interface ImageGridProps {
    images: IImage[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
                <ImageCard key={image._id} image={image} />
            ))}
        </div>
    );
};

export default ImageGrid;