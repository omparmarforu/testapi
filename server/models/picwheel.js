const mongoose = require('mongoose');

const pWheelSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  wheelno: { type: String, required: true },
  wheeltitle: { type: String, required: true },
  wheelcover: { type: String, required: true } // Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('pWheel', pWheelSchema);