import React, { useEffect, useState } from 'react';
import ImageGrid from '../components/Feed/ImageGrid';
import { IImage } from '../types';
import { fetchImages } from '../services/api';
import Loading from '../components/common/Loading';

const HomePage: React.FC = () => {
    const [images, setImages] = useState<IImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadImages = async () => {
        try {
            setLoading(true);
            const fetchedImages = await fetchImages();
            setImages(fetchedImages);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch images');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-4">
                {error}
                <button 
                    onClick={loadImages}
                    className="ml-4 text-blue-500 hover:underline"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Photo Feed</h1>
            {images.length === 0 ? (
                <p className="text-center text-gray-500">No images found</p>
            ) : (
                <ImageGrid images={images} />
            )}
        </div>
    );
};

export default HomePage;