import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $input: profile!) {
    addUser(username: $username, password: $password, input: $input) {
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

export const ADD_TODO = gql`
  mutation addToDo($todoText: String!, $username: String!) {
    addToDo(todoText: $todoText, username: $username) {
      _id
      todoText
      username
      createdAt
    }
}
`

