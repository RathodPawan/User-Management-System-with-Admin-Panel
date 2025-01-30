// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Update Availability
router.put('/update-availability', async (req, res) => {
  const { availabilityStatus, availabilityTime } = req.body;
  
  try {
    const user = await User.findById(req.user.id);  // Assuming user is authenticated
    
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.availabilityStatus = availabilityStatus || user.availabilityStatus;
    user.availabilityTime = availabilityTime || user.availabilityTime;
    
    await user.save();

    res.status(200).json({ msg: 'Availability updated', user });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating availability', error: err.message });
  }
});

module.exports = router;
