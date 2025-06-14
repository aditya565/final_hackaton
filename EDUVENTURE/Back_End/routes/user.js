const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');
const auth = require('../middleware/auth');
const User = require('../models/user');

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Route
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Profile Fetch Error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

