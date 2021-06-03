import { useQuery } from "@apollo/client";
import AuthService from "../api/services/AuthService";
import ME_QUERY from "../graphql/me.query";
import USER_QUERY from '../graphql/user.query';

export const useCurrentUser = () => {
    const isAuthenticated = useIsAuthenticated();
    return isAuthenticated ? useQuery(ME_QUERY) : undefined;
}

export const useUser = (userId) => {
    const isAuthenticated = useIsAuthenticated();
    return isAuthenticated ? useQuery(USER_QUERY, { variables: { id: userId }}) : undefined;
};

export const useIsAuthenticated = () => {
    return typeof AuthService.isAuthenticated() !== 'undefined';
};