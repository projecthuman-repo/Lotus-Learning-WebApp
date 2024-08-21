const User = require('./models/User');

const cleanupInactiveAccounts = async () => {
  try {
    // Get the end of today (just before midnight)
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Get the date 7 days ago (midnight)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(endOfToday.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const result = await User.deleteMany({
      isVerified: false,
      createdAt: { $gte: sevenDaysAgo, $lte: endOfToday } // Accounts created within the last 7 days
    });

    console.log(`Deleted ${result.deletedCount} inactive, non-verified accounts created in the last 7 days.`);
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
};

module.exports = cleanupInactiveAccounts;
