

import axios from "axios";


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://sistemaodontologico.onrender.com", // Ajuste conforme sua API
     // Tempo máximo de espera
    // headers: { 'Authorization' : 'Bearer'} TODO: terminar quando o token estiver pronto
  });


export default api;