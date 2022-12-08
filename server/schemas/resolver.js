const { User } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    user: async (parent, args) => {
      return await User.findById(args.userId).populate("savedBooks");
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      const newUser = {
        user,
        token
      }
      return newUser;
    },
    saveBook: async (parent, args) => {
      return await User.findByIdAndUpdate(
        { _id: args.userId },
        { $addToSet: { savedBooks: args.bookData } },
        { new: true }
      );
    },
    deleteBook: async (parent, args) => {
      return await User.findOneAndUpdate(
        { _id: args.userId },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
    },
    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email});
      const correctPw = await user.isCorrectPassword(args.password);
      const token = signToken(user);
      const loggedInUser = {
        user,
        token
      };
      return loggedInUser;
    }
  }
};

module.exports = resolvers;