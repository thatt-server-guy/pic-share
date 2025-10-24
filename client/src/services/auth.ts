import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Login failed');
    }
};

export const signup = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, { username, email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Signup failed');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};