import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      _id
      email
      password
    }
  }
`;

export const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

// export default CREATE_USER_MUTATION;
// export default CREATE_USER_MUTATION;
