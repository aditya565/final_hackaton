const Quiz = require('../models/Quiz');
const User = require('../models/User');

exports.submitQuiz = async (req, res) => {
  const { quizId, answers } = req.body;
  const userId = req.user.id;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });

    const xpEarned = score * 10;

    const user = await User.findById(userId);
    const alreadyCompleted = user.completedQuizzes.some(q => q.quizId.toString() === quizId);
    if (alreadyCompleted) return res.status(400).json({ msg: 'Quiz already completed' });

    user.completedQuizzes.push({ quizId });
    user.xp += xpEarned;
    await user.save();

    res.json({ msg: 'Quiz submitted', score, xpEarned });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
