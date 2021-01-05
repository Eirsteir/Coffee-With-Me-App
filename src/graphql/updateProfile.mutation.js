import { gql } from '@apollo/client';

const UPDATE_PROFILE_MUTATION = gql`
    mutation updateProfile(
        $name: String!,
        $username: String!,
        $locale: String!
    ) {
    updateProfile(
        name: $name,
        username: $username,
        locale: $locale
    ) {
        success
        errors
        user {
            uuid
            name
            username
            locale
            profilePic
        }
    }
    }
`


export default UPDATE_PROFILE_MUTATION;