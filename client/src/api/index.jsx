import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-dnsmanager.onrender.com', // URL of the backend server
});

export default api;
