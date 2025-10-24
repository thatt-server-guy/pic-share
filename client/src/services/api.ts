import axios from 'axios';
import { IImage } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Add auth token to requests
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const fetchImages = async (): Promise<IImage[]> => {
  const response = await axios.get(`${API_URL}/images`);
  return response.data;
};

export const fetchImageDetails = async (id: string): Promise<IImage> => {
  const response = await axios.get(`${API_URL}/images/${id}`);
  return response.data;
};

export const uploadImage = async (formData: FormData): Promise<IImage> => {
    try {
        const response = await axios.post(`${API_URL}/images/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to upload image');
    }
};

export const likeImage = async (id: string): Promise<IImage> => {
  const response = await axios.post(`${API_URL}/images/${id}/like`);
  return response.data;
};

export const commentOnImage = async (id: string, text: string): Promise<IImage> => {
  const response = await axios.post(`${API_URL}/images/${id}/comments`, { text });
  return response.data;
};