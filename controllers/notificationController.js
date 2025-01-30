// controllers/notificationController.js
const Notification = require('../models/Notification');
const User = require('../models/User');

// Send Notification
const sendNotification = async (req, res) => {
  const { recipients, message, isCritical } = req.body;
  const senderId = req.user.id;

  try {
    // Get the sender's details
    const sender = await User.findById(senderId);

    // Check if sender exists
    if (!sender) {
      return res.status(404).json({ msg: 'Sender not found' });
    }

    // Check if sender is an admin
    const isAdmin = sender.role === 'admin';

    // Get recipient details
    const recipientsList = await User.find({ '_id': { $in: recipients } });

    // Check if all recipients exist
    if (recipientsList.length !== recipients.length) {
      return res.status(400).json({ msg: 'One or more recipients do not exist' });
    }

    // Loop through recipients and process the notification
    for (let recipient of recipientsList) {
      const newNotification = new Notification({
        sender: senderId,
        recipients: [recipient._id],  // Notification is sent individually to each recipient
        message,
        isCritical,
        availabilityStatus: recipient.availabilityStatus,
        status: 'queued',  // Default status is 'queued'
      });

      // If the sender is an admin or it's a critical notification, deliver immediately
      if (isAdmin && isCritical) {
        newNotification.status = 'delivered';
        newNotification.deliveredAt = new Date();
      } else if (recipient.availabilityStatus === 'available') {
        newNotification.status = 'delivered';
        newNotification.deliveredAt = new Date();
      }

      // Save the notification for each recipient
      await newNotification.save();
    }

    res.status(201).json({ msg: 'Notification sent successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error sending notification', error: err.message });
  }
};

module.exports = { sendNotification };
