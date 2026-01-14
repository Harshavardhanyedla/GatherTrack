import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        // In a real app we'd add Authorization header, but for this MVP we might not check it strictly every time
        // config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
});

export default api;
