const mongoose = require('mongoose');
const levelSchema = new mongoose.Schema({
  number: Number,
  title: String,
  concept: String,
  description: String,
  gameType: String,
  questions: [Object], // Or custom schema depending on game type
  xpReward: Number
});
module.exports = mongoose.model('Level', levelSchema);