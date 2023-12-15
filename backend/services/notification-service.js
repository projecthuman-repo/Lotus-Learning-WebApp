//This snippet is for a notificationService in a Node.js application using Mongoose for MongoDB interactions.
//It provides a set of functions to manage notification entities.

//Import Notification from models and messageQueueService from notification-microservice
const Notification = require("../models/Notification");
const messageQueueService = require("../notification-microservice/message-queue-service"); // Adjust import based on your setup

//notificationService is an object containing several asynchronous methods for handling notification-related operations
/*Purpose: To create and save a new notification.
Process:
Creates a new notification document using the Notification model and the provided notificationData.
Saves the notification to the MongoDB database.
Publishes the notification to the message queue using messageQueueService.publishNotification.
Returns the created notification.
*/
const notificationService = {
  async createNotification(notificationData) {
    const notification = new Notification(notificationData);
    await notification.save();

    // Publish the notification to a message queue or microservice
    await messageQueueService.publishNotification(notification);

    return notification;
  },

  /*Purpose: To fetch notifications for a specific user.
     Process:
     Uses Mongoose's find method to retrieve all notifications associated with the given userId.
     Returns the result (an array of notifications).  
   */

  async getNotificationsByUserId(userId) {
    return Notification.find({ userId });
  },

  /* Purpose: To update a specific notification.
Process:
Uses Mongoose's findByIdAndUpdate method to update the notification with the given notificationId.
updates is an object containing the fields to be updated.
{ new: true } returns the updated document.
Returns the updated notification.*/

  async updateNotification(notificationId, updates) {
    return Notification.findByIdAndUpdate(notificationId, updates, {
      new: true,
    });
  },

  /* Purpose: To delete a specific notification.
Process:
Uses Mongoose’s findByIdAndDelete method to remove the notification with the given notificationId.
Returns the result of the deletion operation.*/
  async deleteNotification(notificationId) {
    return Notification.findByIdAndDelete(notificationId);
  },
};

module.exports = notificationService; //This exports the notificationService so it can be used throughout the application, typically in controllers that handle HTTP requests.
