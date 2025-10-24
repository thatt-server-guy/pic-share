import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getImageDetails } from '../services/api';
import Loading from '../components/common/Loading';

const ImageDetails = () => {
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImageDetails = async () => {
            try {
                const data = await getImageDetails(id);
                setImage(data);
            } catch (error) {
                console.error('Error fetching image details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImageDetails();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (!image) {
        return <div>No image found.</div>;
    }

    return (
        <div className="image-details">
            <img src={image.url} alt={image.caption} className="w-full h-auto" />
            <h2 className="text-2xl">{image.caption}</h2>
            <p>Uploaded by: {image.uploaderId}</p>
            <p>Likes: {image.likes.length}</p>
            <div className="comments">
                <h3>Comments:</h3>
                {image.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageDetails;