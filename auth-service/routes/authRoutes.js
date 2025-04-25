const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({
      message: 'User created successfully!'
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get("/session", async (req, res) => {
  const token = req.cookies.session

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  res.json(decoded)
})

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid password' });

    const token = await jwt.sign({ id: user._id, role: user.role, name: user.name, email: user.email }, process.env.JWT_SECRET);
    res.cookie("session", token, {
      path: '/',
      httpOnly: true, // Recommended
      secure: false, // Explicitly set to false for local HTTP
      sameSite: 'Lax', // Or 'Strict' depending on your needs
      maxAge: 24 * 60 * 60 * 1000, // Example expiry
    })
    res.json({
      message: "Logged in successfully!",
      email: user.email,
      id: user.id
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
