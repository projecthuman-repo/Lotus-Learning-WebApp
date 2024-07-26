// tokenManagement.js

// The tokenManagement.js file handles the management of OAuth2 tokens. It checks if the current 
// access token is expired and refreshes it if necessary. It also saves and loads tokens to and from a 
// file to maintain the state between server restarts. This ensures that the access token is 
// always valid when making API requests.

// Purpose: Manages the OAuth2 tokens (access and refresh tokens).
// Functionality: Checks if the access token is expired and refreshes it if necessary. 
// It also handles saving and loading tokens to/from a file, maintaining token persistence across server restarts.


require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const qs = require('qs');

const {
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN
} = process.env;

//Just a buffering period for testing purposes
const BUFFER_PERIOD = 57 * 60 * 1000; 
let tokenExpiry = parseInt(process.env.TOKEN_EXPIRY, 10);

async function refreshAccessToken() {
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: REFRESH_TOKEN,
            grant_type: 'refresh_token'
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          
        const { access_token, expires_in } = response.data;

        const envFilePath = path.resolve(__dirname, '.env');
        let envContent = await fs.readFileSync(envFilePath, 'utf8');
        
        const updatedEnvContent = envContent.split('\n').map(line => {
            if (line.startsWith('ACCESS_TOKEN=')) {
                return `ACCESS_TOKEN='${access_token}'`;
            } else if (line.startsWith('TOKEN_EXPIRY=')) {
                return `TOKEN_EXPIRY='${(Date.now() + expires_in * 1000).toString()}'`;
            }
            return line;
        }).join('\n');

        await fs.writeFileSync(envFilePath, updatedEnvContent.trim());

 
       tokenExpiry = parseInt(process.env.TOKEN_EXPIRY, 10);
        console.log('Access token refreshed successfully');
    } catch (error) {
        console.error('Failed to refresh access token', error.response ? error.response.data : error.message);
    }
}

async function getAccessToken() {
  
    const currentTime = Date.now();
    const expiryWithBuffer = tokenExpiry - BUFFER_PERIOD
    console.log(`Current time: ${currentTime}`);
    console.log(`Token expiry time: ${expiryWithBuffer}`);
    console.log(`Current time (formatted): ${new Date(currentTime).toLocaleString()}`);
    console.log(`Token expiry time (formatted): ${new Date(expiryWithBuffer).toLocaleString()}`);
    if (currentTime >= expiryWithBuffer) {
        console.log('Access token expired. Refreshing...');
        await refreshAccessToken();
    } else {
        console.log('Access token is still valid.');
    }
    return process.env.ACCESS_TOKEN;
}
module.exports = { getAccessToken, refreshAccessToken };
