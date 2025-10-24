import express from 'express';
import Image from '../models/Image';
import { uploadImage, getAllImages, likeImage, commentOnImage } from '../controllers/images';

const router = express.Router();

// Get all images
router.get('/', getAllImages);

// Upload image
router.post('/', async (req, res) => {
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
});

// Like/Unlike image
router.post('/:id/like', async (req, res) => {
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
});

// Add comment
router.post('/:id/comment', async (req, res) => {
  try {
    const { userId, text } = req.body;
    const image = await Image.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    image.comments.push({ user: userId, text } as any); // Type assertion to fix TS error

    await image.save();
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;