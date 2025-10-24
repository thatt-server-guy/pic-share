import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchImageDetails } from '../services/api';
import { IImage, IComment } from '../types';
import Loading from '../components/common/Loading';

const ImageDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [image, setImage] = useState<IImage | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadImage = async () => {
            try {
                if (!id) return;
                setLoading(true);
                const data = await fetchImageDetails(id);
                setImage(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch image details');
            } finally {
                setLoading(false);
            }
        };

        loadImage();
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
    if (!image) return <div className="text-center mt-4">Image not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                    src={image.imageUrl} 
                    alt={image.caption} 
                    className="w-full h-auto"
                />
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">{image.caption}</h2>
                    <p className="text-gray-600 mb-2">
                        Uploaded by: {image.uploaderId.username}
                    </p>
                    <p className="text-gray-600 mb-4">
                        Likes: {image.likes.length}
                    </p>
                    
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Comments</h3>
                        {image.comments.map((comment: IComment) => (
                            <div 
                                key={comment._id} 
                                className="bg-gray-50 p-4 rounded-lg mb-2"
                            >
                                <p className="text-gray-800">{comment.text}</p>
                                <p className="text-gray-500 text-sm mt-1">
                                    By: {comment.user.username}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageDetails;