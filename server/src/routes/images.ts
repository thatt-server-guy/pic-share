import express from 'express';
import { uploadImage, getImages, likeImage, commentOnImage } from '../controllers/images';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Route to upload an image
router.post('/', authenticate, uploadImage);

// Route to get all images
router.get('/', getImages);

// Route to like an image
router.post('/:id/like', authenticate, likeImage);

// Route to comment on an image
router.post('/:id/comment', authenticate, commentOnImage);

export default router;