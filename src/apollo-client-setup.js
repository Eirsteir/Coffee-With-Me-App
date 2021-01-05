import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API_URL } from 'babel-dotenv';

import { getAuthHeaders } from './api/httpHelpers';

const httpLink = createHttpLink({
    uri: API_URL,
});
const authLink = setContext(async (_, { headers }) => {
    const token = await AuthService.getToken();

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