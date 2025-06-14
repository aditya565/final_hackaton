const express = require('express');
const router = express.Router();
const { getAllLessons } = require('../controllers/lessonController');

router.get('/', getAllLessons);

module.exports = router;
