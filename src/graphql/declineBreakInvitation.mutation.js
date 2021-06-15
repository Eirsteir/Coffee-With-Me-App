import { gql } from '@apollo/client';

const DECLINE_BREAK_INVITATION = gql`
mutation declineBreakInvitation($invitation: UUID) {
  declineBreakInvitation(invitation: $invitation) {
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

export default DECLINE_BREAK_INVITATION;