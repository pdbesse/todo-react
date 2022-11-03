const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value) {
      return value.getTime();
    },
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      return null;
    },
  });
  
  const resolvers = {
    Date: dateScalar,
    Query: {
      users: async () => {
        return User.find().populate("connections");
      },
      user: async (parent, { _id }) => {
        return User.findById(_id);
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return await User.findOne({ _id: context.user._id })
            .populate("connections")
            .populate({ path: "connections", populate: { path: "profile" } });
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    },
  
    Mutation: {
      addUser: async (parent, body) => {
        const email = body.email;
        const password = body.password;
        const user = await User.create({ email, password });
        const token = signToken(user);
        user.profile = body.input;
        await user.save();
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("No user found with this email");
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect resolver credentials");
        }
        const token = signToken(user);
        // console.log(token);
  
        return { token, user };
      },
    },
  };
  
  module.exports = resolvers;
  