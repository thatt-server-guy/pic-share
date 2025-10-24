import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRATION = '1h'; // Token expiration time

export const generateToken = (userId: string) => {
    return sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyToken = (token: string) => {
    try {
        return verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};