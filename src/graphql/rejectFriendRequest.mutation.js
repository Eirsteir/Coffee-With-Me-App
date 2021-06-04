import { gql } from "@apollo/client";

const REJECT_FRIEND_REQUEST_MUTATION = gql`
mutation rejectFriendRequest($requester: String!) {
    rejectFriendRequest(requester: $requester) {
      rejectedFriendRequestee {
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


export default REJECT_FRIEND_REQUEST_MUTATION;