/*
nodemailer: This is a module for Node.js to send emails. It's a popular choice for handling email in Node.js applications.
twilio: This is the Node.js client for Twilio, a cloud communications platform that provides services for making and
receiving phone calls, sending and receiving text messages, and performing other communication functions.
pushService: This represents a custom module you would create for handling push notifications.
It's a placeholder indicating where you would integrate a push notification service.
*/

//npm install firebase-admin

// notification-channels.js
const nodemailer = require("nodemailer"); // For sending emails
const twilio = require("twilio"); // For sending SMS (if using Twilio)
const admin = require("firebase-admin"); // Importing Firebase Admin SDK

// Initialize Firebase Admin SDK with your project credentials
admin.initializeApp({
  credential: admin.credential.cert(
    require("/path/to/your/firebase-service-account-file.json")
  ),
});

/*
nodemailer.createTransport(): This function creates a transporter object that can send mail.
It's being configured to use Gmail as the email service.
service: The email service provider, in this case, Gmail.
auth: Authentication object for the email service. process.env.EMAIL_USER and process.env.EMAIL_PASSWORD
are environment variables that store your email username and password.
*/
// Configure email transporter
const emailTransporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Configure SMS service (example using Twilio)
const smsClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/*
 sendEmail: This is an asynchronous function to send an email.
 notification.details: Contains the email details like recipient (to), subject, and body of the email.
 await emailTransporter.sendMail: Sends the email. await is used because sendMail is an asynchronous operation
 */
// Function to send Email
async function sendEmail(notification) {
  const { to, subject, body } = notification.details;
  await emailTransporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: body,
  });
}

/*
 sendSMS: An asynchronous function to send an SMS.
 notification.details: Contains the details for the SMS,
 including the recipient's number (to) and the message text.
 await smsClient.messages.create: Sends the SMS using Twilio's client.
 It specifies the sender's number (from, which is an environment variable) and the message body.
*/

async function sendSMS(notification) {
  // Function to send SMS
  const { to, message } = notification.details;
  await smsClient.messages.create({
    to: to,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: message,
  });
}

/*
 sendPushNotification: This is a placeholder function for sending push notifications.
 The actual implementation will depend on the push notification service you choose to use.
 notification.details: Contains details needed to send the push notification, like the device token, message, etc.
 pushService.send: Calls a method (presumably send) on the pushService object, which should handle the push notification sending logic.
 */

// Function to send Push Notification using Firebase Cloud Messaging
async function sendPushNotification(notification) {
  const { title, body, token } = notification.details; // Extract details from notification
  const message = {
    notification: {
      title: title, // Notification title
      body: body, // Notification body
    },
    token: token, // Target device token
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent push notification:", response);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
}

module.exports = { sendEmail, sendSMS, sendPushNotification };

/*
This line exports the sendEmail, sendSMS, and sendPushNotification functions so they can be used elsewhere in your application,
particularly in the worker service that processes and sends out notifications.
*/
module.exports = { sendEmail, sendSMS, sendPushNotification };
