import apolloClient from '../apollo-client-setup';
import GET_FRIENDING_POSSIBILITIES_QUERY from '../graphql/getfriendingPossibilities.query';

export default {
    getfriendingPossibilities: async () => {
        return apolloClient.query({
            query: GET_FRIENDING_POSSIBILITIES_QUERY
        });
    }
}