import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      profile {
        firstName
        lastName
        age
        location
        gender
      }
      todos {
        todoText
        createdAt
      }
    }
  }
`;

export const QUERY_TODO = gql`
  query todo($id: ID!) {
    todo(_id: $id) {
      _id
      todoText
      username
      createdAt
    }
  }
`;

export const QUERY_ALL_TODOS = gql`
  query todos($username: String!) {
    todos(username: $username) {
      _id
      todoText
      username
      createdAt
  }
}
`;

export const QUERY_ALL_USER = gql`
  query users {
    users {
      _id
      username
      email
      profile {
        firstName
        lastName
        age
        location
        gender
      }
      todos {
        todoText
        createdAt
      }
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      profile {
        firstName
        lastName
        age
        location
        gender
      }
      todos {
        todoText
        createdAt
      }
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query messages {
    username
    messageText
    createdAt
  }
`;
