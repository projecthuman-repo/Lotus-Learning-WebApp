import { gql } from '@apollo/client';

/* The code is defining GraphQL mutations using the `gql` function from the `@apollo/client` library. */

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      _id
      email
      password
    }
  }
`;
