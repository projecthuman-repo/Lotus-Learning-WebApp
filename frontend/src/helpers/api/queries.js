import { gql } from '@apollo/client';

/* The code is defining GraphQL queries using the `gql` function from the `@apollo/client` library. */

export const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;
