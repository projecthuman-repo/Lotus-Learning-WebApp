const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const CrossPlatformUser = require('../../models/cross-platform/User');

/* The `createUser` function is an asynchronous function that takes an argument `args`. It is
  responsible for creating a new user in the database. */
const createUser = async (args) => {
  try {
    const existingUser = await User.findOne({ email: args.userInput.email });

    if (existingUser) {
      throw new Error('User exists already.');
    }

    const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

    const newUser = new User({
      name: args.userInput.name,
      email: args.userInput.email,
      phoneNumber: args.userInput.phoneNumber,
      password: hashedPassword,
      accountType: args.userInput.accountType,
      country: args.userInput.country,
      stateProvince: args.userInput.stateProvince,
      school: args.userInput.school,
    });
    const result = await newUser.save();

    // CrossPlatformUser manages the 3 web app users (lotuslearning, regenquest, spotstitch)
    // If the CrossPlatformUser has not been created with other platform, create a new one
    const crossPlatformUserExists = await CrossPlatformUser.findOne({
      $or: [{ email: result.email }, { phoneNumber: result.phoneNumber }],
    });
    if (crossPlatformUserExists) {
      crossPlatformUserExists.lotuslearningUserId = result._id;
      await crossPlatformUserExists.save();
    } else {
      const newCrossPlatformUser = new CrossPlatformUser({
        email: result.email,
        phoneNumber: result.phoneNumber,
        lotuslearningUserId: result._id,
      });
      await newCrossPlatformUser.save();
    }

    return { ...result._doc, password: null, _id: result.id };
  } catch (err) {
    throw err;
  }
};

/* The `login` function is an asynchronous function that takes an object with `email` and `password`
    properties as its argument. It is responsible for authenticating a user by checking if the
    provided email exists in the database and if the provided password matches the hashed password
    stored in the database. */
const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Password is incorrect!');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      'secretkey',
      {
        expiresIn: '1h',
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  } catch (err) {
    throw err;
  }
};

// Utility function to check if the user is authenticated and authorized
const checkAuth = (req) => {
  if (!req.isAuth) {
    throw new Error('Unauthenticated!');
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
    throw new Error('User not found.');
  }

  // CrossPlatformUser manages the 3 web app users (lotuslearning, regenquest, spotstitch)
  // In this scenario, we assume that the user has created with LotusLearning
  const crossPlatformUserExists = await CrossPlatformUser.findOne({
    lotuslearningUserId: updatedUser._id,
  });
  crossPlatformUserExists.email = updatedUser.email;
  crossPlatformUserExists.phoneNumber = updatedUser.phoneNumber;
  await crossPlatformUserExists.save();

  return { ...updatedUser._doc, password: null }; // Do not return the password
};

// Resolver function to delete a user
const deleteUser = async (args, req) => {
  checkAuth(req); // Ensure the user is authenticated

  const userId = args.userId;

  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new Error('User not found.');
  }

  const crossPlatformUser = await CrossPlatformUser.findOne({
    lotuslearningUserId: userId,
  });
  // CrossPlatformUser manages the 3 web app users (lotuslearning, regenquest, spotstitch)
  // Not deleting the CrossPlatformUser, but setting the lotuslearningUserId to empty string
  crossPlatformUser.lotuslearningUserId = '';
  await crossPlatformUser.save();

  return { ...deletedUser._doc, password: null }; // Do not return the password
};

module.exports = {
  createUser,
  login,
  updateUser,
  deleteUser,
};
