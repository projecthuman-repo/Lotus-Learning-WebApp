//This code snippet provides the functionality for handling notification triggers in a Node.js application. 
//It involves interacting with a message queue and MongoDB.


//Import connectToQueue and publishQueueService from messageQueueService, Notification from models
const { connectToQueue, publishMessage } = require('./messageQueueService');
const Notification = require('./models/Notification');

// Connect to message queue.This line calls connectToQueue to establish a connection with the message queue.
//It's crucial to have this connection set up before handling notification triggers
connectToQueue();

// Function to handle incoming notification triggers
/*A new instance of the Notification model is created using the data from the trigger object. The spread operator (...) is used to copy properties from trigger into the notification object.
A status field is set to 'pending', indicating that the notification has been created but not yet delivered.
*/
const handleNotificationTrigger = async (trigger) => {
  const notification = new Notification({
    ...trigger,
    status: 'pending',
  });

  //The try-catch block is used for error handling.
  // If any part of the notification handling process fails, the error will be caught and logged.
  /* 
  await notification.save(): This saves the notification to MongoDB. The await keyword is used to wait for the promise returned by save() to resolve.
await publishMessage(notification): This publishes the notification to the message queue. This is also an asynchronous operation, thus await is used*/
  try {
    // Save notification to MongoDB
    await notification.save();
    // Publish notification to the message queue
    await publishMessage(notification);
  } catch (error) {
    console.error('Error handling notification trigger:', error);
  }
};

module.exports = { handleNotificationTrigger }; //The handleNotificationTrigger function is exported, making it available to other parts of the application.
