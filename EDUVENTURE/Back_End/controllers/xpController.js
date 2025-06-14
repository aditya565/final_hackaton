const User = require('../models/user');

// XP thresholds for each level
const xpThresholds = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000]; // etc

exports.addXP = async (req, res) => {
  const { userId, earnedXP } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.xp += earnedXP;

    // Check for level up
    let newLevel = user.level;
    while (user.xp >= xpThresholds[newLevel] && newLevel < xpThresholds.length) {
      newLevel++;
    }

    if (newLevel > user.level) {
      user.level = newLevel;

      // 🎖 Add badge logic here
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
      msg: 'XP updated',
      xp: user.xp,
      level: user.level,
      badges: user.badges,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

