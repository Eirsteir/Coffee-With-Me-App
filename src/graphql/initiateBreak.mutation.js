import { gql } from '@apollo/client';

const INITIATE_BREAK_MUTATION = gql`
mutation initiateBreak($addressees: [UUID], $startTime: DateTime) {
  initiateBreak(addressees: $addressees, startTime: $startTime) {
    break_ {
      id
      uuid
      invitation {
        id
        uuid
        created
        sender {
          id
          uuid
          name
        }
        addresseeCount
      }
      participants {
        count
        edges {
          node {
            id
            uuid
            username
          }
        }
      }
      startingAt
    }
  success
  errors
  }
}
`;

export default INITIATE_BREAK_MUTATION;