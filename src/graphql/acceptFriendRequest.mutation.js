import { gql } from "@apollo/client";

const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
mutation acceptFriendRequest($requester: String!) {
    acceptFriendRequest(requester: $requester) {
      friend {
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


export default ACCEPT_FRIEND_REQUEST_MUTATION;