import axios from 'axios';
import { AuthResponse } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Login failed');
    }
};

export const signup = async (username: string, email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, { username, email, password });
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Signup failed');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};