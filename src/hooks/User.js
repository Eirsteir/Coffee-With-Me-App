import { useQuery } from "@apollo/client";

import AuthService from "../api/services/AuthService";
import TOKEN from '../api/token';
import Constants from "../constants/Constants";
import ME_QUERY from "../graphql/me.query";
import USER_QUERY from '../graphql/user.query';

export const useCurrentUser = () => {
    const isAuthenticated = useIsAuthenticated();
    return isAuthenticated ? useQuery(ME_QUERY) : undefined;
}

export const useUser = userId => {
    const isAuthenticated = useIsAuthenticated();
    if (userId === undefined) {
        return useCurrentUser();
    }

    return isAuthenticated ? useQuery(USER_QUERY, { variables: { userId: userId }}) : undefined;
};

export const useIsAuthenticated = () => {
    return typeof AuthService.isAuthenticated() !== 'undefined';
};

export const useLogout = (apolloClient) => {
    // clear apollo cache?
    return () => logout(apolloClient);
}

export const logout = (apolloClient) => {
    TOKEN.remove(Constants.AUTH_TOKEN);
    apolloClient.clearStore();
}