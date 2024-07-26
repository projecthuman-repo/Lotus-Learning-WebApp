require('dotenv').config();
const { refreshAccessToken, getAccessToken } = require('./tokenManagement');

async function main() {
    try {
        await getAccessToken();
        //console.log('Tokens refreshed successfully.');
    } catch (error) {
        console.error('Failed to refresh tokens:', error);
    }
}

main();