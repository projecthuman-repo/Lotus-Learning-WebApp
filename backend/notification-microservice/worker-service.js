/*
Importing subscribeToQueue from messageQueueService
import sendEmail, sendSMS, sendPushNotification from notificationChannels
import Notification MongoDB model
*/
const { subscribeToQueue, publishMessage } = require("./message-queue-service");
const {
  sendEmail,
  sendSMS,
  sendPushNotification,
} = require("./notification-channels");
const Notification = require("../models/Notification");

/* Function to process notifications.
A function named processNotifications is defined. It doesn't take any parameters and
is responsible for setting up the subscription to the message queue and handling incoming notifications.
subscribeToQueue is called with an asynchronous callback function. This callback is executed whenever a
new notification is received from the queue. The notification parameter represents the received message.
Inside the callback, a try-catch block is used for error handling.
A switch statement checks the notification.type and calls the appropriate function (sendEmail, sendSMS,
sendPushNotification) to handle the notification.
*/

const processNotifications = () => {
  subscribeToQueue(async (notification) => {
    try {
      // Send notification based on type
      switch (notification.type) {
        case "email":
          await sendEmail(notification);
          break;
        case "sms":
          await sendSMS(notification);
          break;
        case "push":
          await sendPushNotification(notification);
          break;
        // Add more cases for other notification types if necessary
      }

      // Update notification status in the database
      //await- f the notification is processed successfully, its status is updated to 'delivered' in the MongoDB database using Notification.findByIdAndUpdate
      await Notification.findByIdAndUpdate(notification._id, {
        status: "delivered",
      });
    } catch (error) {
      console.error("Error processing notification:", error);

      // Retry notification if max retry attempts not reached
      if (notification.retryCount < notification.maxRetryAttempts) {
        console.log("Retrying notification...");
        const updatedNotification = await Notification.findByIdAndUpdate(
          notification._id,
          {
            retryCount: notification.retryCount + 1,
            status: "pending",
          },
          {
            new: true,
          }
        );
        await publishMessage(updatedNotification);
      } else {
        // Mark notification as failed if max retry attempts reached
        await Notification.findByIdAndUpdate(notification._id, {
          status: "failed",
        });
      }
    }
  });
};

// For testing purposes
//processNotifications is called to start listening to the message queue and process incoming notifications.
// processNotifications();

module.exports = { processNotifications };
