// apiRequest.js

// The apiRequest.js file is used to make authenticated requests to Google Cloud APIs. 
// It first ensures that the access token is valid by calling a function to get the token, 
// and then it uses this token to make an API request. 
// If the access token is expired, it will be refreshed automatically before the request is made.

// Purpose: Handles the logic for making authenticated API requests.
// Functionality: Uses the access token obtained from tokenManagement.js to make requests to Google Cloud APIs. 
// It focuses on how to use the token and handle API responses or errors.

const axios = require('axios');
const { getAccessToken } = require('./tokenManagement');

async function makeApiRequest() {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.get('https://your-api-endpoint', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('API request failed', error);
        throw error;
    }
}

module.exports = { makeApiRequest };
