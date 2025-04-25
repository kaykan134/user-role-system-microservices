const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('✅ User Service connected to MongoDB');
  app.listen(5001, () => console.log('🚀 User Service running on port 5001'));
});

// User Schema
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
}));

// Middleware to check token
const auth = (req, res, next) => {
  const token = req.cookies.session
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    console.log("Invalid token");
    res.status(401).json({ error: "Invalid token" });
  }
};

//Get user info (by ID)
app.get('/users', auth, async (req, res) => {
  const users = await User.find().select('-password -__v');
  res.json(users);
});

//Update user role (admin only)
app.patch('/user/:id/role', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: "Only admin can update roles" });
  }
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ message: `Role updated to ${role}` });
});
  