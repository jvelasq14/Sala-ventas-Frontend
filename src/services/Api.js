import axiosInstance from 'axios';

const instance = axiosInstance.create({
    baseURL: 'https://sala-ventas-production.up.railway.app'
});

export default instance;