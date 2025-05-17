const User = require('../models/user');

const getAllUsers = async (req, res) =>{
try{
const allusers = await User.find();
const userData = allusers.map(user => ({
      id: user._id,
      name: user.username,
    }));

    res.status(200).json(userData);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
}

module.exports = { 
    getAllUsers,

 };