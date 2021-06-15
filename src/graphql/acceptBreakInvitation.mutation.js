import { gql } from '@apollo/client';

const ACCEPT_BREAK_INVITATION = gql`
mutation acceptBreakInvitation($invitation: UUID) {
  acceptBreakInvitation(invitation: $invitation) {
    invitation {
      id
      uuid
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
              name
              username
              __typename
            }
          }
        }
      }
    }
    success
    errors
  }
}
`;

export default ACCEPT_BREAK_INVITATION;