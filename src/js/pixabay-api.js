import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '51836290-201bf47032d0cc7a32d21d0be';


 export function getImagesByQuery(query) {
    return axios.get('', {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        },
    });
    
}