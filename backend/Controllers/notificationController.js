/*
This controller will handle the logic for creating and managing notifications, 
interacting with the notification service and potentially other services as needed.
*/

/*
Import Joi and NotificationService from notificationService 
*/
const Joi = require('joi');
const NotificationService = require('../services/notificationService');

/*
Here, we define several Joi schemas to validate incoming request data.
Each schema corresponds to different operations like creating or updating notifications.
*/
// Define a schema for notification creation
const createNotificationSchema = Joi.object({
    type: Joi.string().required(),
    userId: Joi.string().required(),
    courseId: Joi.string().required(),
    message: Joi.string().required()
});

// Define a schema for updating notifications
const updateNotificationSchema = Joi.object({
    notificationId: Joi.string().required(),
    updates: Joi.object({
        message: Joi.string(),
        // other fields that can be updated
    }).required()
});

// Define a schema for user ID validation
const getUserIdSchema = Joi.string().required();


//notificationController is an object that contains methods for handling different HTTP requests related to notifications.
/*
Before processing the request, we validate req.body (the data sent in the request) against our createNotificationSchema. 
If the data doesn't meet the schema requirements, we send a 400 Bad Request response with the error details.
*/
const notificationController = {
    async createNotification(req, res) {   //This method is responsible for creating a new notification. It's an async function because it will perform asynchronous operations (like database access)
        try {  
            const { error } = createNotificationSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: "Invalid request data", error: error.details });
            }
            /*After validation, we extract the necessary fields from req.body and use NotificationService to create the notification.
            We respond with a 201 Created status code and include the created notification in the response.
            */
            const { type, userId, courseId, message } = req.body;
            const notification = await NotificationService.createNotification({
                type,
                userId,
                courseId,
                message
            });

            res.status(201).json({ message: 'Notification created successfully', data: notification });
        } catch (error) {
            res.status(500).json({ message: 'Error creating notification', error: error.message });
        }
    },

//This method fetches notifications for a user. It uses the userId from the request parameters.
//We validate the userId in the request parameters to ensure it's in the correct format.
    async getNotifications(req, res) {
        try {
            const { error } = getUserIdSchema.validate(req.params.userId);
            if (error) {
                return res.status(400).json({ message: "Invalid user ID", error: error.details });
            }

            const { userId } = req.params;
            const notifications = await NotificationService.getNotificationsByUserId(userId);
            res.status(200).json({ message: 'Notifications fetched successfully', data: notifications });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching notifications', error: error.message });
        }
    },
//This method updates a specific notification. It uses data from req.body for the updates.
    async updateNotification(req, res) {
        try {
            const { error } = updateNotificationSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: "Invalid request data", error: error.details });
            }

            const { notificationId, updates } = req.body;
            const updatedNotification = await NotificationService.updateNotification(notificationId, updates);
            res.status(200).json({ message: 'Notification updated successfully', data: updatedNotification });
        } catch (error) {
            res.status(500).json({ message: 'Error updating notification', error: error.message });
        }
    },

    //This method handles the deletion of a notification based on the notificationId provided in the request parameters.
    async deleteNotification(req, res) {
        try {
            // Assuming a simple ID validation
            if (!req.params.notificationId) {
                return res.status(400).json({ message: "Invalid notification ID" });
            }

            const { notificationId } = req.params;
            await NotificationService.deleteNotification(notificationId);
            res.status(200).json({ message: 'Notification deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting notification', error: error.message });
        }
    }
};


//Finally, we export the notificationController object so it can be used in other parts of our application,
//like our route definitions.
module.exports = notificationController;

