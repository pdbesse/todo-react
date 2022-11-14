const { AuthenticationError } = require("apollo-server-express");
const { User, ToDo } = require("../models");
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
        return User.find().populate("todos");
      },
      user: async (parent, { _id }) => {
        return User.findById(_id).populate('todos');
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return await User.findOne({ _id: context.user._id }).populate('todos');
            // .populate("todos")
            // .populate({ path: "connections", populate: { path: "profile" } });
        }
        throw new AuthenticationError("You need to be logged in!");
      },
      todos: async (parent, { username }) => {
        const params = username ? { username } : {};
        return ToDo.find(params).sort({ createdAt: -1 });
      },
      todo: async (parent, { todoId }) => {
        return ToDo.findOne({ _id: todoId });
      },
    },
  
    Mutation: {
      addUser: async (parent, body) => {
        const username = body.username;
        const password = body.password;
        const user = await User.create({ username, password });
        const token = signToken(user);
        user.profile = body.input;
        await user.save();
        return { token, user };
      },
      login: async (parent, { username, password }) => {
        const user = await User.findOne({ username });
        if (!user) {
          throw new AuthenticationError("No user found with this username");
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect resolver credentials");
        }
        const token = signToken(user);
        // console.log(token);
  
        return { token, user };
      },
      addToDo: async (parent, { todoText, username }, context) => {
        if (context.user) {
        const todo = await ToDo.create({ todoText, username });
  
        await User.findOneAndUpdate(
          { username: username },
          { $addToSet: { todos: todo._id } }
        );
  
        return todo;
      }
      throw new AuthenticationError('You need to be logged in!');
      },
      removeToDo: async (parent, {todoId}) => {
        return ToDo.findOneAndDelete({ _id: todoId});
      }
    },
  };
  
  module.exports = resolvers;
  