import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchImageDetails } from '../services/api';
import { IImage } from '../types';
import Loading from '../components/common/Loading';

const ImageDetails = () => {
    const { id } = useParams();
    const [image, setImage] = useState<IImage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImage = async () => {
            try {
                if (id) {
                    const data = await fetchImageDetails(id);
                    setImage(data);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            } finally {
                setLoading(false);
            }
        };

        loadImage();
    }, [id]);

    if (loading) return <Loading />;
    if (!image) return <div>Image not found</div>;

    return (
        <div className="image-details">
            <img src={image.url} alt={image.caption} className="w-full h-auto" />
            <h2 className="text-2xl">{image.caption}</h2>
            <p>Uploaded by: {image.uploaderId.username}</p>
            <p>Likes: {image.likes.length}</p>
            <div className="comments">
                <h3>Comments:</h3>
                {image.comments.map((comment) => (
                    <div key={comment._id} className="comment">
                        <p>{comment.text}</p>
                        <p>By: {comment.userId.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageDetails;