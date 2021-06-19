import { gql } from '@apollo/client';
import { LOCATION_CHILD_FIELDS } from './locations.query';

const PENDING_BREAK_INVITATIONS_QUERY = gql`
${LOCATION_CHILD_FIELDS}
query pendingBreakInvitations($before: String, $after: String, $first: Int, $last: Int) {
  pendingBreakInvitations(before: $before, after: $after, first: $first, last: $last) {
    edges {
      node {
        id
        uuid
        created
        sender {
          id
          uuid
          name
          username
        }
        addresseeCount
        subject {
          id
          uuid
          startingAt
          location {
            ...LocationChildFields
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
    pageInfo {
      hasNextPage
      startCursor
      endCursor
    }
    __typename
  }
}
`;

export default PENDING_BREAK_INVITATIONS_QUERY;