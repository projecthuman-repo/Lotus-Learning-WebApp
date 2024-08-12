// user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String},
  lastName: { type: String},
  email: { type: String, required: true, unique: true,},
  password: { type: String, required: true}, // abdullaziz51@gmail.com password -> try to google sign in -> 
  username: { type: String, required: true},
  accountType: { type: String, enum: ['student', 'instructor', 'admin']},
  googleAuth: { type: Boolean, required: false},
  isVerified:{type:Boolean, default:false},
  phoneNumber: { type: String, required: false }, 
  verificationCode: { type: Number, required: false },
  is2FAEnabled: { type: Boolean, default: false }, // Add 2FA enabled flag
  is2FASetupDone: { type: Boolean, default: false }, // Add 2FA setup flag
  createdAt: { type: Date, default: Date.now }, //for periodic cleanup
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
  }, ],
  createdCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
  }, ],
  accomplishments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accomplishment',
  }, ],
  passwordResetOTP: {
      otp: { type: String },
      expiresAt: { type: Date }
  }
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
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