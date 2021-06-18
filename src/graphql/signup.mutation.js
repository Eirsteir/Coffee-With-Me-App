import { gql } from '@apollo/client';

const SIGNUP_MUTATION = gql`
    mutation register(
        $name: String!,
        $email: String!,
        $preferredLocationUuid: UUID,
        $username: String!,
        $password1: String!,
        $password2: String!
    ) {
        register(
            name: $name,
            email: $email,
            username: $username,
            preferredLocationUuid: $preferredLocationUuid,
            password1: $password1,
            password2: $password2
        ) {
            success
            errors
            refreshToken
            token
        }
    }
`

export default SIGNUP_MUTATION;