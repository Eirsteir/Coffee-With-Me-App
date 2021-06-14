import { gql } from '@apollo/client';

const PENDING_BREAK_INVITATIONS_QUERY = gql`
query pendingBreakInvitations {
    pendingBreakInvitations {
      edges {
        node {
          id
          uuid
          created
          sender
          addresseeCount
          subject {
            id
            uuid
            startingAt
            participants {
              count
              __typename
            }
            __typename
          }
        }
      }
      __typename
    }
  }
`;

export default PENDING_BREAK_INVITATIONS_QUERY;