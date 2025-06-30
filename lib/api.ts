import axios from 'axios'

const api = axios.create({
    baseURL: 'https://sabomscleaning-dpegfqarf4dxavcc.swedencentral-01.azurewebsites.net/api',
    headers: {
        'Content-Type': 'application'
    },
    timeout: 10000
});

api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;