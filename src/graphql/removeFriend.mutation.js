import { gql } from '@apollo/client';

const REMOVE_FRIEND_MUTATION = gql`
mutation unfriendUser($friend: UUID) {
  unfriendUser(friend: $friend) {
    unfriendedUser {
      id
      uuid
      username
      name
    }
    ok
  }
}
`;

export default REMOVE_FRIEND_MUTATION;