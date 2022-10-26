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
    email: String
    password: String
    profile: Profile
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
    me: User
}

type Mutation {
    addUser(email: String!, password: String!, input: profile!): Auth
    login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;