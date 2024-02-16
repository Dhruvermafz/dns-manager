import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dnsbackend-production.up.railway.app/', // URL of the backend server
});

export default api;
