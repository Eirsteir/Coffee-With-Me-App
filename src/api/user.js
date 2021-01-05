import axios from 'axios';

import apolloClient from '../apollo-client-setup';
import ME_QUERY from '../graphql/me.query';
import { getAuthHeaders } from './httpHelpers';

const API_SOCIAL_URL = 'http://localhost:8080/api/social';

export default {
    fetchCurrentUser: async () => {
        console.log('FETCHING CURRENT USER');
        return apolloClient.query({
            query: ME_QUERY
        });
    },
    update: async (token, userData) => {
        return axios({
            method: 'PUT',
            url: API_SOCIAL_URL + '/me',
            headers: getAuthHeaders(token),
            data: userData
        });
    },
    fetchFriends: async token => {
        return axios.get(API_SOCIAL_URL + '/friends', { headers: getAuthHeaders(token) });
    },
}