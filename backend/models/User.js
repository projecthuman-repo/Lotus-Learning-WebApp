const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String},
  lastName: { type: String},
  email: { type: String, required: true, unique: true,},
  password: { type: String, required: true},
  username: { type: String, required: true},
  accountType: { type: String, enum: ['student', 'instructor', 'admin']},
  stateProvince: {
    type: String,
    // required: true,
  },
  school: {
    type: String,
  },
  institution:{
    admin:{
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
    },
    institutionName: {
      type: String,
    }
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enrollment',
    },
  ],
  createdCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  accomplishments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accomplishment',
    },
  ],
  // profilePic: {
  //   type: String,
  //   required: true,
  // },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
