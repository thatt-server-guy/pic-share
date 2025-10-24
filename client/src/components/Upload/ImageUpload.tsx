import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [caption, setCaption] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    const handleCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCaption(event.target.value);
    };

    const handleUpload = async () => {
        if (!image || !caption) {
            setError('Please provide an image and a caption.');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);

        try {
            await axios.post('/api/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setImage(null);
            setCaption('');
        } catch (err) {
            setError('Error uploading image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="image-upload">
            <h2>Upload Image</h2>
            {error && <p className="error">{error}</p>}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <input
                type="text"
                placeholder="Caption"
                value={caption}
                onChange={handleCaptionChange}
            />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default ImageUpload;