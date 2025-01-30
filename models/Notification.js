const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  deliveredAt: { type: Date },
  isCritical: { type: Boolean, default: false },
  status: { type: String, enum: ['queued', 'delivered'], default: 'queued' },
  availabilityStatus: { type: String, enum: ['available', 'unavailable'], required: true },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
