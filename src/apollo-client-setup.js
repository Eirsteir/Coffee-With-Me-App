import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API_URL } from 'babel-dotenv';

import TOKEN from './api/token';
import { getAuthHeaders } from './api/httpHelpers';
import Constants from './constants/Constants';

const httpLink = createHttpLink({
    uri: API_URL,
});
const authLink = setContext(async (_, { headers }) => {
    const token = await TOKEN.get(Constants.AUTH_TOKEN);

    return {
        ...headers,
        headers: getAuthHeaders(token)
    };
});

const link = authLink.concat(httpLink);
const cache = new InMemoryCache();

export default new ApolloClient({
link: link,
cache: cache
});