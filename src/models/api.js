import axios from 'axios';

const api = axios.create({
  baseURL: 'https://miniecommerce-production-c1a9.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
