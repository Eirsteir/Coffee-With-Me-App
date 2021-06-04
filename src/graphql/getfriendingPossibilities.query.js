import { gql } from '@apollo/client';

const GET_FRIENDING_POSSIBILITIES_QUERY = gql`
query friendingPossibilities {
    friendingPossibilities {
        count
      edges {
        node {
          id
          uuid
          name
          username
          friendshipStatus
          isViewerFriend
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      __typename
    }
  }  
`

export default GET_FRIENDING_POSSIBILITIES_QUERY;