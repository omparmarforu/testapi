const User = require('../models/user');

const searchUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        name: { $regex: req.query.search, $options: 'i' }, // case-insensitive match
      }
    : {};

  try {
    const users = await User.find(keyword).select('name _id'); // only fetch necessary fields
    res.json({ status: true, result: users });
  } catch (err) {
    res.status(500).json({ status: false, error: 'Failed to fetch users', ERR: err });
  }
};
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
  searchUsers,  
  getAllUsers 

 };