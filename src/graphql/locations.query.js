import { gql } from '@apollo/client';

export const LOCATION_CHILD_FIELDS = gql`
fragment LocationChildFields on Location {
    id
    uuid
    title
    type
    itemType
    __typename
  }
`

const LOCATION_RECURSIVE = gql`
fragment LocationRecursive on Location {
    children {
      edges {
        node {
          ...LocationChildFields
          children {
            edges {
              node {
                ...LocationChildFields
                children {
                  edges {
                    node {
                      ...LocationChildFields
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const LOCATIONS_QUERY = gql`
  ${LOCATION_CHILD_FIELDS}
  ${LOCATION_RECURSIVE}
  query locations {
    locations {
      count
        totalCount
      edges {
        node {
          ...LocationChildFields
          ...LocationRecursive
        }
      }
    }
  }
  
`;

export default LOCATIONS_QUERY;