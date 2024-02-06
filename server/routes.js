//This code snippet is creating an Express router to handle HTTP requests related to notifications in a Node.js web application
/*
express: The Express framework is imported. It's a popular web application framework for Node.js, used for building
web applications and APIs.
router: An instance of express.Router() is created.
This router object is used to define various routes (endpoints) that the server should listen to.
handleNotificationTrigger: This function is imported from a module named notificationMicroservice.
It's presumably an asynchronous function that handles the logic of triggering a notification.
*/
const express = require("express");
const router = express.Router();
const {
  handleNotificationTrigger,
} = require("../notification-microservice/notification-microservice");

/*
A route is defined using router.post(). It listens for POST requests on the /trigger-notification path.
Inside the route handler, there are parameters req (request) and res (response)
which represent the HTTP request and response, respectively.
*/
router.post("/trigger-notification", (req, res) => {
  // Assuming handleNotificationTrigger is an async function
  /* Triggering Notification: When a POST request is made to this endpoint, handleNotificationTrigger
is called with req.body (the request body), which likely contains the data needed to trigger a notification.
Asynchronous Handling: Since handleNotificationTrigger is an async function, .then() and .catch() are used
for handling the promise resolution and rejection.
Success Response: If the promise resolves (meaning the notification was triggered successfully),
a JSON response is sent back with a success message.
Error Handling: If the promise is rejected (meaning there was an error in triggering the notification),
an error response with a status code of 500 (Internal Server Error) is sent back. The error details are included in the response.
 */

  handleNotificationTrigger(req.body)
    .then(() => {
      res.json({ message: "Notification triggered successfully" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Error triggering notification", details: error });
    });
});

module.exports = router;
