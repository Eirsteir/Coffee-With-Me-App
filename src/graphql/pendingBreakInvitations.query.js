import { gql } from '@apollo/client';

const PENDING_BREAK_INVITATIONS_QUERY = gql`
query pendingBreakInvitations {
  pendingBreakInvitations {
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
}
`;

export default PENDING_BREAK_INVITATIONS_QUERY;