const User = require('./models/User');

const cleanupInactiveAccounts = async () => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30); // 30 days ago

    const result = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: cutoffDate }
    });

    console.log(`Deleted ${result.deletedCount} inactive, non-verified accounts.`);
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
};

module.exports = cleanupInactiveAccounts;
