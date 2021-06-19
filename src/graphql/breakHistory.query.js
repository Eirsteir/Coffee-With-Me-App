import { gql } from '@apollo/client';
import { LOCATION_CHILD_FIELDS } from './locations.query';

const BREAK_HISTORY_QUERY = gql`
${LOCATION_CHILD_FIELDS}
query breakHistory {
    breakHistory {
      edges {
        node {
          id
          uuid
          startingAt
          location {
            ...LocationChildFields
          }
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