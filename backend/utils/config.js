// In notification-channels.js, it doesn't recognize the .env file inside backend directory without specifying the path.
require('dotenv').config({ path: './backend/.env' });

/**
 * @const PORT port backend will run on
 * @const BLN_CONNECT url for database connection
 */
const PORT = process.env.PORT || 5001;
const BLN_CONNECT = process.env.BLN_CONNECT;
const DATABASE_CROSS_PLATFORM_CONNECTION =
  process.env.DATABASE_CROSS_PLATFORM_CONNECTION;

// NOTE: EMAIL_RECIPIENT is for testing purposes only. This email should be the user's email.
// Email notifications
const EMAIL_SENDER = process.env.EMAIL_SENDER;
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Push notifications
const FIREBASE_ADMIN_SECRET_KEY_PATH =
  process.env.FIREBASE_ADMIN_SECRET_KEY_PATH;
const FCM_DEVICE_TOKEN = process.env.FCM_DEVICE_TOKEN;

// SMS notifications
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

module.exports = {
  // Server
  PORT,
  // Database
  BLN_CONNECT,
  DATABASE_CROSS_PLATFORM_CONNECTION,
  // Email notifications
  EMAIL_SENDER,
  EMAIL_RECIPIENT,
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  // Push notifications
  FIREBASE_ADMIN_SECRET_KEY_PATH,
  FCM_DEVICE_TOKEN,
  // SMS notifications
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
};
