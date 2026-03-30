import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_API_BACKEND;

export const heroApi = axios.create({
    baseURL:`${BASE_URL}/api/heroes`
})
