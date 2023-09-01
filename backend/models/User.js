const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ['Learner', 'Educator', 'Admin'],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  stateProvince: {
    type: String,
    required: true,
  },
  school: {
    type: String,
  },
  // profilePic: {
  //   type: String,
  //   required: true,
  // },
});

// Hash the password before saving
// userSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }

//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
