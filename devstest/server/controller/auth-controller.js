
const User = require('../models/user');
//HOME PAGE LOGIC
const home = async(req, res) =>{
    try{
        res.status(200).send("WELCOME TO HOME PAGE");
    }
    catch(error){
        console.log(error);
    }
}

//SIGNUP PAGE LOGIC
const signup = async(req, res) =>{
    try{
        const {username, email, password} = req.body;
        const userExist =  await User.findOne({email});

        if(userExist){
            const userId= userExist._id 
            return res.status(400).send({msg:"email already exist"+userId});
        }  
       const newUser =  await User.create({username, email, password});
        res.status(201).json({newUser});


    }
    catch(error){
        res.status(500).json({msg:"PAGE NOT npm startFOUND"+error});
    }
}

//LOGIN PAGE LOGIC
const login = async(req, res) =>{
    try{
        res.status(200).send("WELCOME TO LOGIN PAGE");
    }
    catch(error){
        res.status(400).json({msg:"PAGE NOT FOUND"});
    }
}

module.exports = { home,signup,login };