const { gql } = require("apollo-server-express");

const typeDefs = gql`
scalar Date

input profile {
    firstName: String
    lastName: String
    age: String
    location: String
    gender: String
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    profile: Profile
    todos: [ToDo]!
}

type ToDo {
    _id: ID
    todoText: String
    username: String
    createdAt: String
}

type Profile {
    firstName: String
    lastName: String
    age: String
    location: String
    gender: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(_id: ID!): User
    todos: [ToDo]
    todo(_id: ID!): ToDo
    me: User
}

type Mutation {
    addUser(username: String!, password: String!, input: profile!): Auth
    login(username: String!, password: String!): Auth
    addToDo(todoText: String!, username: String!): ToDo
    removeToDo(todoId: ID!): ToDo
}
`;

module.exports = typeDefs;