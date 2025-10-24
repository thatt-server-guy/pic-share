import React, { useEffect, useState } from 'react';
import ImageGrid from '../components/Feed/ImageGrid';
import { fetchImages } from '../services/api';

const HomePage: React.FC = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getImages = async () => {
            try {
                const fetchedImages = await fetchImages();
                setImages(fetchedImages);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        };

        getImages();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="home-page">
            <h1 className="text-2xl font-bold">Photo Feed</h1>
            <ImageGrid images={images} />
        </div>
    );
};

export default HomePage;