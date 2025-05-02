const multer = require('multer');
const { storage } = require('../utils/cloudnary');

const upload = multer({ storage });
if(!upload){
    console.error('MULTER or server error:', err);
    res.status(500).json({ error: err.message || 'Unknown server error' });
  
}
module.exports = upload;