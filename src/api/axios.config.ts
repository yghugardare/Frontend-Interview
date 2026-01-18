import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import type { APIError } from '@/types/blog.types';


const apiClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        const apiError: APIError = {
            message: error.response?.data
                ? String((error.response.data as any).message || error.response.data)
                : error.message || 'An unexpected error occurred',
            status: error.response?.status,
        };
        return Promise.reject(apiError);
    }
);

export default apiClient;
