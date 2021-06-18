import { gql } from '@apollo/client';

const USER_QUERY = gql`
query user($userId: UUID) {
    user(id: $userId) {
      id 
      uuid
      username
      name
      profilePic
      isViewerFriend
      socialContext
      currentStatus {
        id
        statusType
        verb
      }
      friends {
        totalCount
        edges {
            node {
              id
              uuid
              name 
              username
              profilePic
              isViewerFriend
            }
          }
      }
      friendshipStatus
      preferredLocation {
        id
        uuid
        title
      }
      currentLocation {
        id
        uuid
        title
      }
    }
  }
`

export default USER_QUERY;