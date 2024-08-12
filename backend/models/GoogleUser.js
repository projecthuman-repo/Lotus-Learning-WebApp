const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/cryptoUtil');

const googleUserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  accessTokenExpiry: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
});

// Encrypt tokens before saving
googleUserSchema.pre('save', function (next) {
  if (this.isModified('accessToken')) {
    this.accessToken = encrypt(this.accessToken);
  }
  if (this.isModified('refreshToken')) {
    this.refreshToken = encrypt(this.refreshToken);
  }
  next();
});

// Decrypt tokens after retrieving
googleUserSchema.methods.getAccessToken = function () {
  return decrypt(this.accessToken);
};

googleUserSchema.methods.getRefreshToken = function () {
  return decrypt(this.refreshToken);
};

const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

module.exports = GoogleUser;
