const { createOAuth2Client } = require('simple-oauth2');
require('dotenv').config();

// Load credentials from .env file
const credentials = {
    client: {
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
    },
    auth: {
      tokenHost: 'https://oauth2.googleapis.com',
      tokenPath: '/token',
      authorizePath: '/authorize',
    },
  };

// Initialize the OAuth2 Library
const oauth2 = createOAuth2Client(credentials);

// Function to refresh token
async function refreshToken() {
  const refreshToken = process.env.REFRESH_TOKEN;
  try {
    const tokenParams = {
      refresh_token: refreshToken,
    };
    const refreshedToken = await oauth2.refreshToken(tokenParams);
    const accessToken = refreshedToken.token.access_token;

    // Update .env file or your token storage with new accessToken
    process.env.ACCESS_TOKEN = accessToken;
    console.log('Access Token Refreshed:', accessToken);
  } catch (error) {
    console.error('Error refreshing token:', error.message);
  }
}

// Check token expiry periodically and refresh
function checkTokenExpiry() {
  const expirationTime = oauth2.accessToken.expired();
  if (expirationTime) {
    console.log('Access token expired. Refreshing...');
    refreshToken();
  } else {
    console.log('Access token is still valid.');
  }
}

// Set an interval to check token expiry every hour (adjust as needed)
setInterval(checkTokenExpiry, 10 * 1000); // 30 second interval

// Initial check on startup
checkTokenExpiry();