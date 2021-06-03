import { gql } from '@apollo/client';

const GET_FRIENDING_POSSIBILITIES_QUERY = gql`
query friendingPossibilities {
    friendingPossibilities {
        count
      edges {
        node {
          id
          uuid
          username
          friendshipStatus
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