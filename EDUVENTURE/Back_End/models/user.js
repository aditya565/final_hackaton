const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },

  // Gamification fields
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  badges: {
    type: [String],
    default: []
  },

  // Progress Tracking
  completedLessons: {
    type: [String],  // Store lesson IDs as strings (or ObjectId if preferred)
    default: []
  },
  completedQuizzes: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
      },
      completedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  completedLevels: {
    type: [Number], // Track level numbers completed
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

