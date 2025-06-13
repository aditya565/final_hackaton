const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const User = require('../models/user');
const auth = require('../middleware/auth');

// Helper to calculate level based on XP (simple example)
function calculateLevel(xp) {
  return Math.floor(xp / 100) + 1; // e.g., 100 XP per level
}

// GET quiz by ID
router.get('/:quizId', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST submit quiz answers
router.post('/:quizId/submit', auth, async (req, res) => {
  try {
    const { answers } = req.body; // array of indices selected by user
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctOptionIndex) score++;
    });

    // Load user
    const user = await User.findById(req.user.id);

    // Check if quiz already completed
    const alreadyCompleted = user.completedQuizzes.some(cq =>
      cq.quizId.toString() === quiz._id.toString()
    );
    if (alreadyCompleted) {
      return res.status(400).json({ msg: 'Quiz already completed' });
    }

    // Add completed quiz info
    user.completedQuizzes.push({
      quizId: quiz._id,
      score,
      completedAt: new Date()
    });

    // Update XP - for example, 10 XP per correct answer
    user.xp += score * 10;

    // Update level based on XP
    user.level = calculateLevel(user.xp);

    await user.save();

    res.json({ score, total: quiz.questions.length, xp: user.xp, level: user.level });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
