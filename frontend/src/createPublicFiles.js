const fs = require('fs');

// This dotenv is the one used inside React. We have not installed it independently. Load dotenv Intentionally because build process does not have access to .env file yet
const dotenv = require('dotenv');
dotenv.config();

const swEnv = `const swEnv = {  
  REACT_APP_FIREBASE_API_KEY: '${process.env.REACT_APP_FIREBASE_API_KEY}',
  REACT_APP_FIREBASE_AUTH_DOMAIN: '${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}',
  REACT_APP_FIREBASE_PROJECT_ID: '${process.env.REACT_APP_FIREBASE_PROJECT_ID}',
  REACT_APP_FIREBASE_STORAGE_BUCKET: '${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}',
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: '${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}',
  REACT_APP_FIREBASE_APP_ID: '${process.env.REACT_APP_FIREBASE_APP_ID}',
  REACT_APP_FIREBASE_MEASUREMENT_ID: '${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}'
}
`;

const jsonGcmSenderId = `{
  "gcm_sender_id": "${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}"
}
`;

fs.writeFileSync('./public/swEnv.js', swEnv);
fs.writeFileSync('./public/manifest.json', jsonGcmSenderId);
