const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  mobileNumber: { 
    type: String 
  },
  bio: { 
    type: String 
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  availabilityStatus: { 
    type: String, 
    enum: ['available', 'unavailable'],
    default: 'available'
  },
  availabilityTime: {
    start: { type: String }, // e.g. '08:00 AM'
    end: { type: String }    // e.g. '05:00 PM'
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
