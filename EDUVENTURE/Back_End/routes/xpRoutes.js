const express = require('express');
const router = express.Router();
const { addXP } = require('../controllers/xpController');

router.post('/add-xp', addXP);

module.exports = router;
