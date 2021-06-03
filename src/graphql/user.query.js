import { gql } from '@apollo/client';

const USER_QUERY = gql`
query user($userId: UUID) {
    user(id: $userId) {
      id 
      uuid
      username
      name
      isViewerFriend
      socialContext
      currentStatus {
        id
        statusType
        verb
      }
      friendshipStatus
    }
  }
`

export default USER_QUERY;