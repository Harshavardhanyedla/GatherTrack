import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://gathertrack.onrender.com/api',
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
