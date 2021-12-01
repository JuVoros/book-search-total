const { User} = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return User.findOne(context);
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Incorrect Email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Incorrect Password");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, {username, email, password }) => {
      const user = await User.create({
        username, email, password
      });
      const token = signToken(user);

      return { token, user }
    },

    saveBook: async (parent, { bookData, token }) => {
      return User.findOneAndUpdate(
        { token: token },
        { $addToSet: { savedBooks: bookData } },
        { new: true }
      );
    },

    removeBook: async (parent, { bookId, token }) => {
      return User.findOneAndUpdate(
        { token: token },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
