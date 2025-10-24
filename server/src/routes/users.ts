import { Router } from 'express';
import { getUserProfile, updateUserProfile, deleteUser } from '../controllers/users';
import { authenticate } from '../middleware/auth';

const router = Router();

// Get user profile
router.get('/profile', authenticate, getUserProfile);

// Update user profile
router.put('/profile', authenticate, updateUserProfile);

// Delete user account
router.delete('/profile', authenticate, deleteUser);

export default router;