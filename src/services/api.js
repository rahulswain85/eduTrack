import axios from 'axios';

console.log("API URL:", import.meta.env.VITE_API_URL);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${API_BASE}/auth/refresh-token`,
            { refreshToken },
            { withCredentials: true }
          );
          if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            if (data.refreshToken) {
              localStorage.setItem('refreshToken', data.refreshToken);
            }
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/';
        }
      }
    }

    return Promise.reject(error);
  }
);
