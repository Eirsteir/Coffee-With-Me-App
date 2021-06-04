import { gql } from "@apollo/client";

const CANCEL_FRIEND_REQUEST_MUTATION = gql`
mutation cancelFriendRequest($toFriend: String!) {
    cancelFriendRequest(toFriend: $toFriend) {
      cancelledFriendRequestee {
        id
        uuid
        name
        username
      }
      success
      errors
    }
  }
`;


export default CANCEL_FRIEND_REQUEST_MUTATION;