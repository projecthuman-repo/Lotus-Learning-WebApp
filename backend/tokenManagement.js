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

const {
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN
} = process.env;

async function refreshAccessToken() {
    try {
        const response = await axios.post('http://localhost:5000/callback', null, {
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                refresh_token: REFRESH_TOKEN,
                grant_type: 'refresh_token'
            }
        });

        const { access_token, expires_in } = response.data;

        // Update the environment variables
        process.env.ACCESS_TOKEN = access_token;
        process.env.TOKEN_EXPIRY = Date.now() + expires_in * 1000;

        // Save the new tokens to the .env file
        const envFilePath = path.resolve(__dirname, '.env');
        const envContent = `
CLIENT_ID=${CLIENT_ID}
CLIENT_SECRET=${CLIENT_SECRET}
REFRESH_TOKEN=${REFRESH_TOKEN}
ACCESS_TOKEN=${access_token}
TOKEN_EXPIRY=${Date.now() + expires_in * 1000}
        `;
        fs.writeFileSync(envFilePath, envContent.trim());

        console.log('Access token refreshed successfully');
    } catch (error) {
        console.error('Failed to refresh access token', error);
    }
}

async function getAccessToken() {
    const tokenExpiry = parseInt(process.env.TOKEN_EXPIRY, 10);
    if (Date.now() >= tokenExpiry) {
        await refreshAccessToken();
    }
    return process.env.ACCESS_TOKEN;
}

module.exports = { getAccessToken, refreshAccessToken };
