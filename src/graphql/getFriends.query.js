import { gql } from '@apollo/client';

const GET_FRIENDS_QUERY = gql`
    query allFriendships($user: String!) {
    friendships(user: $user) {
      count
      edges {
        node {
          id
          username
          friendshipStatus
        }
      }
    }
  }
`

export default GET_FRIENDS_QUERY;