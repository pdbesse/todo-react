import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $input: profile!) {
    addUser(email: $email, password: $password, input: $input) {
      token
      user {
        profile {
          firstName
          lastName
          age
          location
          gender
        }
      }
    }
  }
`;

