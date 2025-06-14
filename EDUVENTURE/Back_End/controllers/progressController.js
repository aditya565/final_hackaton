const User = require('../models/user');

const xpPerLesson = 100;

exports.completeLesson = async (req, res) => {
  const { userId, lessonId } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // ✅ Check if already completed
    if (user.completedLessons.includes(lessonId)) {
      return res.status(400).json({ msg: 'Lesson already completed' });
    }

    // ✅ Mark lesson as complete
    user.completedLessons.push(lessonId);

    // ✅ Add XP (you can reuse your XP logic here or just add basic XP)
    user.xp += xpPerLesson;

    // Optional: Level-up logic (repeating same logic from XP controller)
    const xpThresholds = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000];
    let newLevel = user.level;
    while (user.xp >= xpThresholds[newLevel] && newLevel < xpThresholds.length) {
      newLevel++;
    }

    if (newLevel > user.level) {
      user.level = newLevel;

      // Badge unlocking
      if (newLevel >= 2 && !user.badges.includes("Rookie")) {
        user.badges.push("Rookie");
      }
      if (newLevel >= 5 && !user.badges.includes("Pro Learner")) {
        user.badges.push("Pro Learner");
      }
      if (newLevel >= 8 && !user.badges.includes("Mastermind")) {
        user.badges.push("Mastermind");
      }
    }

    await user.save();
    res.json({
      msg: 'Lesson completed',
      xp: user.xp,
      level: user.level,
      badges: user.badges,
      completedLessons: user.completedLessons,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
