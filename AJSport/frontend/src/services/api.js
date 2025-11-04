import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Lee la URL base desde las variables de entorno
});

export default api;