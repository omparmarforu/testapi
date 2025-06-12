const User = require('../models/user');
//const bcrypt = require('bcryptjs');
//const jwt = require("jsonwebtoken");

const home = async (req, res) => {
  try{
    res.status(200).json({msg:"WELCOME TO HOME PAGE"});
  }
  catch(err){
    console.log(err);
  }
}
const register = async (req, res) => {
  console.log({'Body': req.body});
  try{
    const {name, username, email, countrycode, mobileno, password, gender, dob} = req.body;
    const userExist = await User.findOne({email:email});
    
    if(userExist){
      return res.status(400).json({msg:"Email ID already exist !"});
    }

    const createUser = await User.create({name, username, email, countrycode, mobileno, password, gender, dob});
    return   res.status(201).json({
      msg: createUser,
      token: await createUser.generateToken(),
      userId: createUser._id.toString(),
  
    });
    
  }    
  catch(err){
    console.log(err);
  } 
}

const login = async (req, res) =>{
try{
 const {email, password} = req.body;
 const userExist = await User.findOne({email});

 if(!userExist){
  return res.status(400).json({msg:"Invalid Credencials"});
 }
const checkPass = await userExist.comparePassword(password);
if(checkPass){
  res.status(201).json({
    msg: "Login Successfully",
    token : await userExist.generateToken(),
    userId : userExist._id.toString(),
    username : userExist.username,


  });
}
else{
  res.status(401).json({msg:"Invalid Credencials"});
}
}
catch(err){
  console.log("LOGIN ERROR - ".err);
  res.status(401).json({msg:"Login Error - "+err});
  } 
}



module.exports = { home,register,login };
/*const pWheel = require('../models/picwheel');
const pWheelMedia = require('../models/picwheelmedia');

const picWheel = async (req, res) => {
  try {
    const { userid, wheelid, wheelno, wheeltitle } = req.body;

    const wheelcoverFile = req.files?.wheelcover?.[0];
    const mediaFiles = req.files?.media || [];

    if (!wheelcoverFile) {
      return res.status(400).json({ error: 'Wheel cover image is missing.' });
    }

    const wheelcover = wheelcoverFile.path; // Cloudinary image URL

    //  Create Wheel
    const wheel = await pWheel.create({
      userid,
      wheelno,
      wheeltitle,
      wheelcover
    });

    // Create Media Entries
    const mediaDocs = mediaFiles.map(file => ({
      userid,
      wheelid: wheel._id,
      mediaUrl: file.path, // Cloudinary URL
      type: file.mimetype.startsWith('video') ? 'video' : 'image'
    }));

    const wheelMedia = await pWheelMedia.insertMany(mediaDocs);

    res.status(201).json({ picwheel: wheel, media: wheelMedia });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};*/


