

import axios from "axios";


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5143/", // Ajuste conforme sua API
    timeout: 5000, // Tempo máximo de espera
    // headers: { 'Authorization' : 'Bearer'} TODO: terminar quando o token estiver pronto
  });


export default api;