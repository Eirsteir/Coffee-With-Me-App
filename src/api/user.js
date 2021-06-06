import apolloClient from '../apollo-client-setup';
import ME_QUERY from '../graphql/me.query';
import GET_FRIENDS_QUERY from '../graphql/getFriends.query';

export default {
    fetchCurrentUser: () => {
        return apolloClient.query({
            query: ME_QUERY
        });
    },
    fetchFriends: async (token, userId) => {
        return apolloClient.query({
            query: GET_FRIENDS_QUERY,
            variables: { user: userId }
        });
    },
}