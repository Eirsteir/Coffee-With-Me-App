import axios from 'axios';
import { getHeaders } from './httpHelpers';

const API_SOCIAL_URL = 'http://localhost:8080/api/social';

export default {
    fetchUserData: async (token) => {
        return axios({
            method: 'GET',
            url: API_SOCIAL_URL + '/me',
            headers: getHeaders(token)
        });
    },
    update: async (token, userData) => {
        return axios({
            method: 'PUT',
            url: API_SOCIAL_URL + '/me',
            headers: getHeaders(token),
            data: userData
        });
    }
}