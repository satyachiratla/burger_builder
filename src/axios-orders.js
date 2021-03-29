import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://steam-outlet-256509-default-rtdb.firebaseio.com/'
});

export default instance;