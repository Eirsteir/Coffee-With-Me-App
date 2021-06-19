import { gql } from '@apollo/client';

const ME_QUERY = gql`
query me {
  me {
    id
    uuid
    name
    profilePic
    username
    locale
    friends {
      totalCount
      edges {
        node {
          id
          uuid
          name
          username
          isViewerFriend
          currentStatus {
            statusType
            verb
            created
          }
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
    }
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
    currentStatus {
      id
      statusType
      verb
      created
    }
  }
}
`

export default ME_QUERY;