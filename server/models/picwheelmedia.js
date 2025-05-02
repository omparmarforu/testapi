const mongoose = require('mongoose');

const pWheelMediaSchema = new mongoose.Schema({
  userid: { type: String, ref: 'User', required: true },
  wheelid: { type: String, ref: 'pWheel', required: true },
  mediaUrl: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('pWheelMedia', pWheelMediaSchema);
