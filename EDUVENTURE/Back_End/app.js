const express = require('express');
const connectDB = require('./db'); // your MongoDB connection file
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Basic route to test server
app.get('/', (req, res) => {
  res.send('API is running...');
});

