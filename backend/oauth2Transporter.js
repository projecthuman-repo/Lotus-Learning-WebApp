const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('../backend/utils/config');

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: config.REFRESH_TOKEN
});

let transporter;
let tokenExpiryTime;

const getTransporter = async () => {
  const currentTime = Date.now();
  
  // Check if we already have a transporter and the token is still valid
  if (transporter && tokenExpiryTime && currentTime < tokenExpiryTime) {
    return transporter;
  }

  
  const { token, res } = await oauth2Client.getAccessToken();
  const expires_in = res.data.expires_in;

  tokenExpiryTime = currentTime + expires_in * 1000; // expires_in is in seconds

  // Create a new transporter with the new access token
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: config.EMAIL_SENDER,
      clientId: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      refreshToken: config.REFRESH_TOKEN,
      accessToken: token,
    },
  });

  return transporter;
};

module.exports = getTransporter;
