import { Request, Response } from 'express';
import Image from '../models/Image';
import { uploadImageToBlob } from '../utils/storage';

// Upload an image
export const uploadImage = async (req: Request, res: Response) => {
    try {
        const { caption } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const imageUrl = await uploadImageToBlob(file);
        const newImage = new Image({
            caption,
            imageUrl,
            uploaderId: req.user.id,
            uploadDate: new Date(),
        });

        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image.', error });
    }
};

// Get all images
export const getAllImages = async (req: Request, res: Response) => {
    try {
        const images = await Image.find().populate('uploaderId', 'username');
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images.', error });
    }
};

// Like an image
export const likeImage = async (req: Request, res: Response) => {
    try {
        const { imageId } = req.params;
        const userId = req.user.id;

        const image = await Image.findById(imageId);
        if (!image) {
            return res.status(404).json({ message: 'Image not found.' });
        }

        if (image.likes.includes(userId)) {
            image.likes = image.likes.filter(id => id !== userId);
        } else {
            image.likes.push(userId);
        }

        await image.save();
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: 'Error liking image.', error });
    }
};

// Comment on an image
export const commentOnImage = async (req: Request, res: Response) => {
    try {
        const { imageId } = req.params;
        const { comment } = req.body;
        const userId = req.user.id;

        const image = await Image.findById(imageId);
        if (!image) {
            return res.status(404).json({ message: 'Image not found.' });
        }

        image.comments.push({ userId, comment, date: new Date() });
        await image.save();
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ message: 'Error commenting on image.', error });
    }
};