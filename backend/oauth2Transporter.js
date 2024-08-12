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

const getTransporter = async () => {
 
  const accessToken = await oauth2Client.getAccessToken();
  if (transporter && accessToken.res.data.expires_in > 0) {
    return transporter;
  }

  
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
      accessToken: accessToken,
    },
  });

  return transporter;
};

module.exports = getTransporter;
