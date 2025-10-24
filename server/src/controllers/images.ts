import { Request, Response } from 'express';
import Image from '../models/Image';

export const getAllImages = async (req: Request, res: Response) => {
  try {
    const images = await Image.find()
      .populate('uploaderId', 'username')
      .sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { caption, imageUrl, uploaderId } = req.body;
    const newImage = new Image({
      caption,
      imageUrl,
      uploaderId
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const likeImage = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const image = await Image.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const likeIndex = image.likes.indexOf(userId);
    if (likeIndex === -1) {
      image.likes.push(userId);
    } else {
      image.likes.splice(likeIndex, 1);
    }

    await image.save();
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const commentOnImage = async (req: Request, res: Response) => {
  try {
    const { userId, text } = req.body;
    const image = await Image.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    image.comments.push({ user: userId, text } as any);
    await image.save();
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};