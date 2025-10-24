import express from 'express';
import multer from 'multer';
import { uploadImage, getImages, getImageById, likeImage, commentOnImage } from '../controllers/images';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Image routes
router.post('/upload', authenticate, upload.single('image'), uploadImage);
router.get('/', getImages);
router.get('/:id', getImageById);
router.post('/:id/like', authenticate, likeImage);
router.post('/:id/comments', authenticate, commentOnImage);

export default router;