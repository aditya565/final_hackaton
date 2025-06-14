const express = require('express');
const router = express.Router();
const { completeLesson } = require('../controllers/progressController');

router.post('/complete-lesson', completeLesson);

module.exports = router;
