const Notification = require('../models/Notification');
const messageQueueService = require('../notification-microservice/messageQueueService'); // Adjust import based on your setup

const notificationService = {
    async createNotification(notificationData) {
        const notification = new Notification(notificationData);
        await notification.save();

        // Publish the notification to a message queue or microservice
        await messageQueueService.publishNotification(notification);

        return notification;
    },

    async getNotificationsByUserId(userId) {
        return Notification.find({ userId });
    },

    async updateNotification(notificationId, updates) {
        return Notification.findByIdAndUpdate(notificationId, updates, { new: true });
    },

    async deleteNotification(notificationId) {
        return Notification.findByIdAndDelete(notificationId);
    }
};

module.exports = notificationService;
