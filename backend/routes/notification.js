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

router.get('/notifications/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch notifications for the user
    const notifications = await Notification.find({ userId });

    // Send the notifications back to the client
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

module.exports = router;
