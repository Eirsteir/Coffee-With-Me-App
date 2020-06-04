import axios from 'axios';
import AUTH from './auth';

const API_SOCIAL_URL = 'http://localhost:8080/api/social';

export default {
    fetchUserData: async (token) => {
        return axios({
            method: 'GET',
            url: API_SOCIAL_URL + '/me',
            headers: AUTH.getHeaders(token)
        });
    },
    update: async (token, userData) => {
        return axios({
            method: 'PUT',
            url: API_SOCIAL_URL + '/me',
            headers: AUTH.getHeaders(token),
            data: userData
        });
    }
}