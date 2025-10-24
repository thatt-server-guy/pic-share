import axios from 'axios';
import { IImage } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchImages = async (): Promise<IImage[]> => {
  const response = await axios.get(`${API_URL}/images`);
  return response.data;
};

export const fetchImageDetails = async (id: string): Promise<IImage> => {
  const response = await axios.get(`${API_URL}/images/${id}`);
  return response.data;
};

export const uploadImage = async (formData: FormData): Promise<IImage> => {
  const response = await axios.post(`${API_URL}/images/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const likeImage = async (id: string): Promise<IImage> => {
  const response = await axios.post(`${API_URL}/images/${id}/like`);
  return response.data;
};

export const commentOnImage = async (id: string, text: string): Promise<IImage> => {
  const response = await axios.post(`${API_URL}/images/${id}/comments`, { text });
  return response.data;
};