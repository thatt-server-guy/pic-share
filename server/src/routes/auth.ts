import express from 'express';
import { login, signup } from '../controllers/auth';
import { validateSignup, validateLogin } from '../utils/validation';

const router = express.Router();

// Signup route
router.post('/signup', validateSignup, signup);

// Login route
router.post('/login', validateLogin, login);

export default router;