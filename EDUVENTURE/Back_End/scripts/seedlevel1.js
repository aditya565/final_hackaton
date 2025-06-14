// scripts/seedLevel1.js

const mongoose = require('mongoose');
require('dotenv').config();
const Level = require('../models/level');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('MongoDB connected...');

  // Define Level 1
  const level1 = new Level({
    number: 1,
    title: 'Print Statements & Variables',
    concept: 'Basics of Python - print, variable assignment',
    description: 'Learn how to print output and declare variables using mini-games.',
    gameType: 'fill-in-the-blank',
    xpReward: 100,
    questions: [
      {
        type: 'fill-in-the-blank',
        prompt: 'Fill in the blank to print "Hello World"',
        code: '_____("Hello World")',
        correctAnswer: 'print'
      },
      {
        type: 'fill-in-the-blank',
        prompt: 'Declare a variable "x" and assign it the value 5',
        code: 'x = _____',
        correctAnswer: '5'
      },
      {
        type: 'mcq',
        prompt: 'What is the output of `print(3 + 2)`?',
        options: ['32', '5', '3+2', 'None'],
        correctOptionIndex: 1
      },
      {
        type: 'mcq',
        prompt: 'Which of these is a valid variable name?',
        options: ['2name', 'user-name', 'name_1', 'class'],
        correctOptionIndex: 2
      }
    ]
  });

  // Remove existing level 1 if any and insert new
  await Level.deleteOne({ number: 1 });
  await level1.save();

  console.log('✅ Level 1 seeded successfully');
  process.exit();
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
