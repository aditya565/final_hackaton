require('dotenv').config();
const mongoose = require('mongoose');

const Lesson = require('../models/lesson');
const Quiz = require('../models/Quiz');
const Course = require('../models/course'); // Make sure filename is course.js

const MONGO_URI = process.env.MONGO_URI;

const level2Lessons = [
  {
    title: "What are Variables?",
    content: "<p>Variables are used to store data in Python...</p>",
    level: 2
  },
  {
    title: "Data Types in Python",
    content: "<p>Python supports several data types such as int, float, string...</p>",
    level: 2
  },
  {
    title: "Assigning Values to Variables",
    content: "<p>You can assign values to variables using the = operator...</p>",
    level: 2
  },
  {
    title: "Working with Numbers",
    content: "<p>Python supports integers and floating point numbers...</p>",
    level: 2
  },
  {
    title: "Strings and Text Data",
    content: "<p>Strings are sequences of characters enclosed in quotes...</p>",
    level: 2
  }
];

const level2Quiz = {
  title: "Quiz: Variables and Data Types",
  level: 2,
  questions: [
    {
      questionText: "Which of these is a valid variable name in Python?",
      options: ["2var", "var_2", "var-2", "var 2"],
      correctOptionIndex: 1
    },
    {
      questionText: "What data type would '3.14' be classified as?",
      options: ["Integer", "Float", "String", "Boolean"],
      correctOptionIndex: 1
    },
    {
      questionText: "How do you assign the value 10 to a variable x?",
      options: ["x := 10", "x == 10", "x = 10", "x equals 10"],
      correctOptionIndex: 2
    },
    {
      questionText: "Which of these is NOT a Python data type?",
      options: ["list", "integer", "character", "dictionary"],
      correctOptionIndex: 2
    },
    {
      questionText: "Strings in Python are enclosed within:",
      options: ["< > brackets", "( ) parentheses", "\" \" or ' ' quotes", "{ } braces"],
      correctOptionIndex: 2
    }
  ]
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");

    // Find or create the course "Python Basics"
    let course = await Course.findOne({ title: "Python Basics" });
    if (!course) {
      course = new Course({
        title: "Python Basics",
        description: "Learn Python programming from scratch"
      });
      await course.save();
      console.log("Created course: Python Basics");
    } else {
      console.log("Found existing course: Python Basics");
    }

    // Insert lessons
    for (const lessonData of level2Lessons) {
      const existingLesson = await Lesson.findOne({ title: lessonData.title, level: 2, course: course._id });
      if (!existingLesson) {
        const lesson = new Lesson({
          ...lessonData,
          course: course._id
        });
        await lesson.save();
        console.log(`Inserted lesson: ${lesson.title}`);
      } else {
        console.log(`Lesson already exists: ${existingLesson.title}`);
      }
    }

    // Insert quiz
    const existingQuiz = await Quiz.findOne({ title: level2Quiz.title, level: 2, course: course._id });
    if (!existingQuiz) {
      const quiz = new Quiz({
        title: level2Quiz.title,
        level: level2Quiz.level,
        questions: level2Quiz.questions,
        course: course._id
      });
      await quiz.save();
      console.log(`Inserted quiz: ${quiz.title}`);
    } else {
      console.log(`Quiz already exists: ${existingQuiz.title}`);
    }

    await mongoose.disconnect();
    console.log("Seeding complete and disconnected from MongoDB.");
  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  }
}

seed();
