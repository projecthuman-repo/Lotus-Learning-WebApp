const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// Utility function to check if the user is authenticated and authorized
const checkAuth = (req) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!");
  }
};

// Resolver function to update user details
const updateUser = async (args, req) => {
  checkAuth(req); // Ensure the user is authenticated

  const userId = args.userId;
  const userUpdates = args.userInput;

  // Hash the new password if it's being changed
  if (userUpdates.password) {
    userUpdates.password = await bcrypt.hash(userUpdates.password, 12);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, userUpdates, {
    new: true,
  });
  if (!updatedUser) {
    throw new Error("User not found.");
  }

  return { ...updatedUser._doc, password: null }; // Do not return the password
};

// Resolver function to delete a user
const deleteUser = async (args, req) => {
  checkAuth(req); // Ensure the user is authenticated

  const userId = args.userId;

  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new Error("User not found.");
  }

  return { ...deletedUser._doc, password: null }; // Do not return the password
};

module.exports = {
  /* The `createUser` function is an asynchronous function that takes an argument `args`. It is
  responsible for creating a new user in the database. */
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });

      if (existingUser) {
        throw new Error("User exists already.");
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: hashedPassword,
        accountType: args.userInput.accountType,
        country: args.userInput.country,
        stateProvince: args.userInput.stateProvince,
        school: args.userInput.school,
      });
      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  /* The `login` function is an asynchronous function that takes an object with `email` and `password`
  properties as its argument. It is responsible for authenticating a user by checking if the
  provided email exists in the database and if the provided password matches the hashed password
  stored in the database. */
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User does not exist!");
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Password is incorrect!");
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        "secretkey",
        {
          expiresIn: "1h",
        }
      );
      return { userId: user.id, token: token, tokenExpiration: 1 };
    } catch (err) {
      throw err;
    }
  },
  // Adding the new resolvers here
  updateUser,
  deleteUser,
};
