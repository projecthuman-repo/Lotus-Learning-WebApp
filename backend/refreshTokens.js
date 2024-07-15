require('dotenv').config();
const { refreshAccessToken } = require('./tokenManagement');

async function main() {
    try {
        await refreshAccessToken();
        console.log('Tokens refreshed successfully.');
    } catch (error) {
        console.error('Failed to refresh tokens:', error);
    }
}

main();