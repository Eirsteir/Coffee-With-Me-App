import axios from 'axios';

import apolloClient from '../apollo-client-setup';
import ME_QUERY from '../graphql/me.query';
import GET_FRIENDS_QUERY from '../graphql/getFriends.query';
import { getAuthHeaders } from './httpHelpers';

const API_SOCIAL_URL = 'http://localhost:8080/api/social';

export default {
    fetchCurrentUser: () => {
        return apolloClient.query({
            query: ME_QUERY
        });
    },
    // getUser: () => useQuery(USER_QUERY),
    update: async (token, userData) => {
        return axios({
            method: 'PUT',
            url: API_SOCIAL_URL + '/me',
            headers: getAuthHeaders(token),
            data: userData
        });
    },
    fetchFriends: async (token, userId) => {
        return apolloClient.query({
            query: GET_FRIENDS_QUERY,
            variables: { user: userId }
        });
    },
}