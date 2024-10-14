import axios from 'axios';

const api = axios.create({
    baseURL: "https://api.gdswellness.com/api/contact",

});

export const googleAuth = (code) => api.get(`/google?code=${code}`);

