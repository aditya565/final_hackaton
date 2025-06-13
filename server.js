const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/xp', require('./routes/xpRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/lessons', require('./routes/LessonRoutes'));

// Add your quiz routes here
app.use('/api/quizzes', require('./routes/quizRoutes')); // <-- add this line

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch(err => console.log(err));
