// TODO: Unused file. Please ask Anupama about this.

const Notification = require('../models/Notification');
const messageQueueService = require('../notification-microservice/message-queue-service');

const notificationService = {
  async createNotification(notificationData) {
    const notification = new Notification(notificationData);
    await notification.save();

    // Publish the notification to a message queue or microservice
    await messageQueueService.publishMessage(notification);

    return notification;
  },

  // retrieve all notifications associated with the given userId.
  async getNotificationsByUserId(userId) {
    return Notification.find({ userId });
  },

  // update the notification with the given notificationId using the updates object.
  async updateNotification(notificationId, updates) {
    return Notification.findByIdAndUpdate(notificationId, updates, {
      new: true, // returns the updated document.
    });
  },

  // remove the notification with the given notificationId.
  async deleteNotification(notificationId) {
    return Notification.findByIdAndDelete(notificationId);
  },
};

module.exports = notificationService;
