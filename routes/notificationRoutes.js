const express = require('express');
const { sendNotification } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure the user is authenticated

const router = express.Router();

// Route to send a notification
router.post('/send', authMiddleware, sendNotification);

module.exports = router;
