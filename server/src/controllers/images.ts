import { Request, Response } from 'express';
import Image from '../models/Image';
import { IUser } from '../models/User';

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const uploadImage = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const newImage = new Image({
            caption: req.body.caption,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
            uploaderId: req.user._id
        });

        await newImage.save();

        // Return the image data as base64 in the response
        const imageResponse = {
            _id: newImage._id,
            caption: newImage.caption,
            uploaderId: newImage.uploaderId,
            likes: newImage.likes,
            comments: newImage.comments,
            createdAt: newImage.createdAt,
            imageUrl: `data:${newImage.image.contentType};base64,${newImage.image.data.toString('base64')}`
        };

        res.status(201).json(imageResponse);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading image' });
    }
};

export const getImages = async (req: Request, res: Response) => {
    try {
        const images = await Image.find()
            .populate('uploaderId', 'username')
            .sort({ createdAt: -1 });

        // Convert images to include base64 data
        const imageResponses = images.map(image => ({
            _id: image._id,
            caption: image.caption,
            uploaderId: image.uploaderId,
            likes: image.likes,
            comments: image.comments,
            createdAt: image.createdAt,
            imageUrl: `data:${image.image.contentType};base64,${image.image.data.toString('base64')}`
        }));

        res.json(imageResponses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images' });
    }
};

export const getImageById = async (req: Request, res: Response) => {
    try {
        const image = await Image.findById(req.params.id)
            .populate('uploaderId', 'username')
            .populate('comments.user', 'username');

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const imageResponse = {
            _id: image._id,
            caption: image.caption,
            uploaderId: image.uploaderId,
            likes: image.likes,
            comments: image.comments,
            createdAt: image.createdAt,
            imageUrl: `data:${image.image.contentType};base64,${image.image.data.toString('base64')}`
        };

        res.json(imageResponse);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching image' });
    }
};

export const likeImage = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const userId = req.user._id;
        if (image.likes.includes(userId)) {
            image.likes = image.likes.filter(id => id.toString() !== userId.toString());
        } else {
            image.likes.push(userId);
        }

        await image.save();
        res.json(image);
    } catch (error) {
        res.status(500).json({ message: 'Error updating like' });
    }
};

export const commentOnImage = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { text } = req.body;
        const image = await Image.findById(req.params.id);
        
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        image.comments.push({
            user: req.user._id,
            text,
            createdAt: new Date()
        });

        await image.save();
        res.json(image);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment' });
    }
};