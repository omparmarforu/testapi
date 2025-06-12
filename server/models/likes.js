const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  contentId: { type: String, required: true },
  createdAt: { type: String, required: true },
 
}, { timestamps: true });

module.exports = mongoose.model('pWheelLikes', likesSchema);