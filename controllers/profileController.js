const User = require('../models/User');

// Update User Profile
const updateProfile = async (req, res) => {
  const { name, mobile, bio, availability } = req.body;
  const userId = req.user.id;  // From JWT token

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      name, mobile, bio, availability
    }, { new: true });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err });
  }
};

module.exports = { updateProfile };
