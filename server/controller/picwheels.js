//PIC WHEEL LOGIC
const mongoose = require('mongoose');
const pWheel = require('../models/picwheel');
const pWheelMedia = require('../models/picwheelmedia');
const pWheelLike = require('../models/likes');


const createWheel = async (req, res) => {

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
      if(wheel && wheelMedia){
      res.status(201).json({ picwheel: wheel, media: wheelMedia });
      }
      else{
      res.status(401).json({msg : "FAILED TO ADD DATA"});
      }
    } catch (err) {
      console.error("ERROR:", JSON.stringify(err, null, 2)); 
  res.status(500).json({ error: err.message || 'An unexpected error occurred', details: err });
    }
  };

  const getWheel = async (req, res) => {
    try{
      const { userid } = req.query;
      if (!userid) return res.status(400).json({ error: "Missing userid" });
    
      const wheelData = await pWheel.find({userid});
      res.status(200).json({
        success: true,
        data: wheelData
      });
    }
    catch(err){
      res.status(500).json({ success: false, error: err.message });
    }
  }
  const getWheelMedia = async (req, res) => {
    try{
      const { wheelid }= req.query;
      if(!wheelid) return res.status(400).json({ error: "Missing wheelid" });
      const wheelMedia = await pWheelMedia.find({wheelid : new mongoose.Types.ObjectId(wheelid)});
      const mediaIds = wheelMedia.map(media => media._id);
      const getLikeCounter = await pWheelLike.countDocuments({ contentId: { $in: mediaIds } });
      res.status(200).json({
        success: true, 
        likes: getLikeCounter,   
        data: wheelMedia  
      });
    }
    catch(err){
      res.status(500).json({ success: false, error: err.message });
    }
  }
  module.exports = {createWheel, getWheel, getWheelMedia};