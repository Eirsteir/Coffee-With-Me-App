import { useQuery, useLazyQuery } from "@apollo/client";
import UserService from "../api/services/UserService";
import ADD_FRIEND_MUTATION from '../graphql/addFriend.mutation';
import REMOVE_FRIEND_MUTATION from '../graphql/removeFriend.mutation';
import GET_FRIENDING_POSSIBILITIES_QUERY from '../graphql/getfriendingPossibilities.query';

export const useFriendsById = userId => {
    return UserService.getFriends(userId);
}

export const useFriendingPossibilities = async () => useQuery(GET_FRIENDING_POSSIBILITIES_QUERY);

export const useAddFriend = () =>  useLazyQuery(ADD_FRIEND_MUTATION);

export const useRemoveFriend = () => useLazyQuery(REMOVE_FRIEND_MUTATION);