const { AuthenticationError } = require("apollo-server-express");
const { User, Message } = require("../models");
const { signToken } = require("../utils/auth");
const { GraphQLScalarType, Kind } = require("graphql");