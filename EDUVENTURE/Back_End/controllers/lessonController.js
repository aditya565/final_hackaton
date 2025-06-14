const Lesson = require('../models/Lesson');

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ order: 1 });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
