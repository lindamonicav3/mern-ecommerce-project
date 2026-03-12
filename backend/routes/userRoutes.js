const express = require('express');

const User = require('../db/models/userSchema');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/user/signup', async (req, res) => {
  try {
    const { name, email, password, role = 'USER' } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // if (password != confirmPassword) {
    //   return res.status(400).json({ message: 'Passwords dont match' });
    // }
    const hashedPassword = await bcrypt.hash(password, 2);

    const dbResponse = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role,
    });
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.post('/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or Password Incorrect' });
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return res.status(401).json({ message: 'Email or Password Incorrect' });
    }

    const SECRET_KEY =
      'fsdefe87re89ru39825r942780efheb676thtdetsefubvisihf0w8his';

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
      expiresIn: '7d',
    });

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      message: 'User logged in',
      token,
      user: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
