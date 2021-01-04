import { gql } from '@apollo/client';


const SIGNIN_MUTATION = gql`
    mutation signin($email: String!, $password: String!) {
        tokenAuth(email: $email, password: $password) {
            success,
            errors,
            token,
            refreshToken,
            unarchiving,
            user {
            id
            }
        }
    }
`

export default SIGNIN_MUTATION;