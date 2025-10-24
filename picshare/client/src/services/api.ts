import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
};

export const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
};

export const uploadImage = async (imageData) => {
    const response = await axios.post(`${API_URL}/images/upload`, imageData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const fetchImages = async () => {
    const response = await axios.get(`${API_URL}/images`);
    return response.data;
};

export const fetchImageDetails = async (imageId) => {
    const response = await axios.get(`${API_URL}/images/${imageId}`);
    return response.data;
};

export const likeImage = async (imageId) => {
    const response = await axios.post(`${API_URL}/images/${imageId}/like`);
    return response.data;
};

export const commentOnImage = async (imageId, commentData) => {
    const response = await axios.post(`${API_URL}/images/${imageId}/comments`, commentData);
    return response.data;
};