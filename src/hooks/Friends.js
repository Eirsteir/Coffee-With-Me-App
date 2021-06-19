import { useQuery, useMutation } from "@apollo/client";
import UserService from "../api/services/UserService";
import ADD_FRIEND_MUTATION from '../graphql/addFriend.mutation';
import REMOVE_FRIEND_MUTATION from '../graphql/removeFriend.mutation';
import GET_FRIENDING_POSSIBILITIES_QUERY from '../graphql/getfriendingPossibilities.query';
import ACCEPT_FRIEND_REQUEST_MUTATION from '../graphql/acceptFriendRequest.mutation';
import REJECT_FRIEND_REQUEST_MUTATION from '../graphql/rejectFriendRequest.mutation';
import CANCEL_FRIEND_REQUEST_MUTATION from '../graphql/cancelFriendRequest.mutation';
import ME_QUERY from "../graphql/me.query";

export const useFriendsById = userId => {
    return UserService.getFriends(userId);
}

export const useFriendingPossibilities = () => useQuery(GET_FRIENDING_POSSIBILITIES_QUERY);

export const useAddFriend = options => useMutation(ADD_FRIEND_MUTATION, options);

export const useRemoveFriend = () => useMutation(REMOVE_FRIEND_MUTATION);

export const useAcceptFriendRequest = () => useMutation(ACCEPT_FRIEND_REQUEST_MUTATION);

export const useRejectFriendRequest = () => useMutation(REJECT_FRIEND_REQUEST_MUTATION);

export const useCancelFriendRequest = options => useMutation(CANCEL_FRIEND_REQUEST_MUTATION, options);
