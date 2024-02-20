const express = require('express');
const router = express.Router();
const {
  handleNotificationTrigger,
} = require('../notification-microservice/notification-microservice');

// Triggering Notification
router.post('/trigger-notification', (req, res) => {
  // TODO: Validate the request body

  // the request body should contain the data needed to trigger a notification
  handleNotificationTrigger(req.body)
    .then(() => {
      res.json({ message: 'Notification triggered successfully' });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: 'Error triggering notification', details: error });
    });
});

module.exports = router;
