import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      email
      profile {
        firstName
        lastName
        age
        location
        gender
      }
    }
  }
`;

export const QUERY_ALL_USER = gql`
  query users{
    users {
      _id
      email
      profile {
        firstName
        lastName
        age
        location
        gender
      }
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      profile {
        firstName
        lastName
        age
        location
        gender
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