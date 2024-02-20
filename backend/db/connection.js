const config = require('../utils/config');
const mongoose = require('mongoose');

// Connection options (optional)
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to the learningsystem database
const connectToBLNDatabase = async () => {
  try {
    await mongoose.connect(config.BLN_CONNECT, dbOptions);
    console.log('Connected to the default database');
  } catch (error) {
    throw new Error(`Connecting to the default database: ${error}`);
  }
};

// Create a connection to the CrossPlatform database
const crossPlatformDatabase = mongoose.createConnection(
  config.DATABASE_CROSS_PLATFORM_CONNECTION,
  dbOptions
);

const connectToCrossPlatformDatabase = async () => {
  try {
    await crossPlatformDatabase.asPromise();
    console.log('Connected to the CrossPlatform database');
  } catch (error) {
    throw new Error(`Connecting to the CrossPlatform database: ${error}`);
  }
};

// Connect to all databases
const connectToDatabases = async () => {
  try {
    await connectToBLNDatabase();
    await connectToCrossPlatformDatabase();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  connectToDatabases,
  crossPlatformDatabase,
};
