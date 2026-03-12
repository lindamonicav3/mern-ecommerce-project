const express = require('express');
const router = express.Router();
const User = require('../db/models/userSchema');
const { checkToken, adminOnly } = require('../middlewares/checkToken');

//GET All Users
router.get('/users', checkToken, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete User
router.delete('/users/:id', checkToken, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
