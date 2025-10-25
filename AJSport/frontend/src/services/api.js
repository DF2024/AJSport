import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Lee la URL base desde las variables de entorno
});

export default api;