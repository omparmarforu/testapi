//PIC WHEEL LOGIC
const pWheel = require('../models/picwheel');
const pWheelMedia = require('../models/picwheelmedia');


const picWheel = async (req, res) => {

    try {
      const { userid, wheelid, wheelno, wheeltitle } = req.body;
      const wheelcoverFile = req.files['wheelcover']?.[0];
      const mediaFiles = req.files['media'] || [];
  
      if (!wheelcoverFile) {
        return res.status(400).json({ error: 'Wheel cover image is missing.' });
      }
  
      const wheelcover = wheelcoverFile.path;
  
      // Create wheel
      const wheel = await pWheel.create({
        userid,
        wheelid,
        wheelno,
        wheeltitle,
        wheelcover
      });
  
      // Prepare media entries
      const mediaDocs = mediaFiles.map(file => ({
        userid,
        wheelid: wheel._id,
        mediaUrl: file.path,
        type: file.mimetype.startsWith('video') ? 'video' : 'image'
      }));
  
      const wheelMedia = await pWheelMedia.insertMany(mediaDocs);
  
      res.status(201).json({ picwheel: wheel, media: wheelMedia });
    } catch (err) {
      console.error("ERROR:", JSON.stringify(err, null, 2)); // Proper error logging
  res.status(500).json({ error: err.message || 'An unexpected error occurred', details: err });
    }
  };

  module.exports = {picWheel};