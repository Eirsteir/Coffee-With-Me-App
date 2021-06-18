import { gql } from '@apollo/client';

const CHILD_FIELDS = gql`
fragment ChildFields on Location {
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
          ...ChildFields
          children {
            edges {
              node {
                ...ChildFields
                children {
                  edges {
                    node {
                      ...ChildFields
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
  ${CHILD_FIELDS}
  ${LOCATION_RECURSIVE}
  query locations {
    locations {
      count
        totalCount
      edges {
        node {
          ...ChildFields
          ...LocationRecursive
        }
      }
    }
  }
  
`;

export default LOCATIONS_QUERY;