/*
This code snippet is a part of a Node.js application that uses Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js.
It defines a schema for a Notification model and a handleNotificationTrigger function*/
const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  //mongoose.Schema: This function creates a new Mongoose schema with the given structure.
  userId: { type: String, required: true }, //userId: A string that's required. It represents the ID of the user to whom the notification belongs.
  courseId: String, //It's the ID of the course related to the notification.
  type: { type: String, required: true }, //A required string. This could be the type of notification (like 'New Course', 'Course Completed', etc.).
  title: { type: String, required: true }, //A required string. This is the content of the notification.
  message: { type: String, required: true }, //A required string. This is the content of the notification.
  status: { type: String, default: "pending" }, //A string with a default value of 'pending'. This field can be used to track the delivery status of the notification (e.g., 'pending', 'delivered', 'failed')
});

/*
mongoose.model: This function creates a model based on the defined schema.
A model is essentially a constructor compiled from the Schema definition.
'Notification': This is the name of the model. Mongoose will automatically look for the plural, lowercased version of this name in the database (i.e., 'notifications').
Exporting the Model: The model is exported so it can be used elsewhere in the application to interact with the notifications collection in the MongoDB database.
*/
const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification; //Finally, we export the handleNotificationTrigger function so it can be used elsewhere in our application.
