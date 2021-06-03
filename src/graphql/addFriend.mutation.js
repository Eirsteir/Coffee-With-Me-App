import { gql } from '@apollo/client';

const ADD_FRIEND_MUTATION = gql`
mutation friend_request($toFriend: String!) {   
    sendFriendRequest(toFriend: $toFriend) {
    sent_friend_requestee {
        id
        uuid
        username
      }
      success
      errors
    }
  }
`;

export default ADD_FRIEND_MUTATION;