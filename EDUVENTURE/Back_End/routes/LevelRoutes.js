const router = require('express').Router();
const Level = require('../models/Level');
router.get('/', async (req, res) => {
  const levels = await Level.find();
  res.json(levels);
});
module.exports = router;