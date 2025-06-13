const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Gamification
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  badges: [String],

  // Learning Progress
  completedLessons: [String], // stores lesson IDs or names
  completedQuizzes: [{
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    score: Number,
    completedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

