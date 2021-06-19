import { gql } from '@apollo/client';
import { LOCATION_CHILD_FIELDS } from './locations.query';

const INITIATE_BREAK_MUTATION = gql`
${LOCATION_CHILD_FIELDS}
mutation initiateBreak($addressees: [UUID], $startingAt: DateTime, $location: UUID) {
  initiateBreak(addressees: $addressees, startingAt: $startingAt, location: $location) {
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
      location {
        ...LocationChildFields
      }
    }
  success
  errors
  }
}
`;

export default INITIATE_BREAK_MUTATION;