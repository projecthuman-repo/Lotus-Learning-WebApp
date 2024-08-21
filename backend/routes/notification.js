const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const {
  handleNotificationTrigger,
} = require('../notification-microservice/notification-microservice');

// Define validation rules
const validateNotification = [
  check('userId').notEmpty().withMessage('User ID is required'),
  check('type')
    .isIn(['email', 'sms', 'push'])
    .withMessage('Type must be one of email, sms, or push'),
  check('payload').isObject().withMessage('Payload is required'),
  check('status').optional().isIn(['pending', 'delivered', 'failed']),
  check('retryCount').optional().isInt({ min: 0 }),
  check('maxRetryAttempts').optional().isInt({ min: 0 }),
];

// Triggering Notification
router.post('/trigger-notification', validateNotification, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // The request body is validated
  handleNotificationTrigger(req.body)
    .then(() => {
      res.json({ message: 'Notification triggered successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error triggering notification', details: error });
    });
});

//Trigger notifications for all users
router.post('/trigger-notification-all', validateNotification, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
   
    const users = await User.find({}, '_id'); 

    await Promise.all(
      users.map((user) => {
        return handleNotificationTrigger({ ...req.body, userId: user._id.toString() });
      })
    );

    res.json({ message: 'Notifications triggered successfully for all users' });
  } catch (error) {
    console.error('Error triggering notifications for all users:', error);
    res.status(500).json({ error: 'Error triggering notifications for all users', details: error });
  }
});

//notifications for specific user
router.get('/notifications/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

//All notifications
router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({});
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching all notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

//delete a specific notification
router.delete('/notifications/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Error deleting notification' });
  }
});

// Delete all notifications
router.delete('/notifications', async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.status(200).json({ message: 'All notifications deleted successfully' });
  } catch (error) {
    console.error('Error deleting all notifications:', error);
    res.status(500).json({ message: 'Error deleting all notifications' });
  }
});

module.exports = router;
