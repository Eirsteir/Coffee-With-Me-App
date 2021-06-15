import { gql } from '@apollo/client';

const BREAK_HISTORY_QUERY = gql`
query breakHistory {
    breakHistory {
      edges {
        node {
          id
          uuid
          startingAt
          invitation {
            id 
            uuid
            sender {
              id
              uuid
              name
            }
          }
          participants {
            count
            edges {
              node {
                id
                uuid
                username
                name
                __typename
              }
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }  
`;

export default BREAK_HISTORY_QUERY;