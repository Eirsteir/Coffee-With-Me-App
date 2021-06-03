import { gql } from '@apollo/client';

const ME_QUERY = gql`
    query me {
        me {
            id 
            uuid
            name
            profilePic
            username 
            friends {
                totalCount
                edges {
                    node {
                      name 
                      username
                      friends {
                        count
                        edges {
                          node {
                            name
                            username
                          }
                        }
                      }
                    }
                  }
            }
            currentStatus {
                id
                statusType
                verb
                created
            }
        }
    }
`

export default ME_QUERY;