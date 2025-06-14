const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} must have at least 2 options']
  },
  correctOptionIndex: {
    type: Number,
    required: true
  }
});

// Custom validator to ensure options array length >= 2
function arrayLimit(val) {
  return val.length >= 2;
}

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: Number,
    required: true
  },
  questions: {
    type: [questionSchema],
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);


