const { AuthorizationCode } = require('simple-oauth2');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Load credentials from .env file
const credentials = {
    client: {
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET,
    },
    auth: {
        tokenHost: 'https://oauth2.googleapis.com',
        tokenPath: '/token',
        authorizePath: '/o/oauth2/auth',
    },
};

// Initialize the OAuth2 Library
const oauth2 = new AuthorizationCode(credentials);

const tokenConfig = {
    scope: 'https://www.googleapis.com/auth/calendar',
    redirect_uri: process.env.REDIRECT_URI,
};

// Function to refresh token
async function refreshToken() {
    const refreshToken = process.env.REFRESH_TOKEN;
    try {
        const tokenParams = {
            refresh_token: refreshToken,
        };
        const accessToken = await oauth2.createToken(tokenParams);
        const newToken = await accessToken.refresh();

        // Update .env file or your token storage with new accessToken
        const envFilePath = path.resolve(__dirname, '.env');
        let envContent = fs.readFileSync(envFilePath, 'utf8');

        // Preserve the original format and update only necessary variables
        const updatedEnvContent = envContent.split('\n').map(line => {
            if (line.startsWith('ACCESS_TOKEN=')) {
                return `ACCESS_TOKEN=${newToken.token.access_token}`;
            } else if (line.startsWith('REFRESH_TOKEN=')) {
                return `REFRESH_TOKEN=${newToken.token.refresh_token}`;
            } else if (line.startsWith('TOKEN_EXPIRY=')) {
                return `TOKEN_EXPIRY=${(Date.now() + newToken.token.expires_in * 1000).toString()}`;
            }
            return line;
        }).join('\n');

        fs.writeFileSync(envFilePath, updatedEnvContent.trim());

        // Optionally reload the .env variables (if needed)
        require('dotenv').config({ path: envFilePath });

        console.log('Access Token Refreshed:', newToken.token.access_token);
    } catch (error) {
        console.error('Error refreshing token:', error.message);
    }
}

// Check token expiry periodically and refresh
function checkTokenExpiry() {
    const tokenExpiry = parseInt(process.env.TOKEN_EXPIRY, 10);
    const currentTime = Date.now();
    if (currentTime >= tokenExpiry) {
        console.log('Access token expired. Refreshing...');
        refreshToken();
    } else {
        console.log('Access token is still valid.');
    }
}

// Set an interval to check token expiry every 10 seconds (adjust as needed)
setInterval(checkTokenExpiry, 10 * 1000); // 10 second interval

// Initial check on startup
checkTokenExpiry();
