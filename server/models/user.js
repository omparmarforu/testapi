
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
"name" : {type: String, required: true},
"username": {type: String, required: true},
"email" : {type: String, required: true},
"countrycode" : {type:String, required: false},
"mobileno" : {type:Number, required: false},
"password" : {type: String, required: true},
"gender" : {type: String, required: false},
"dob" : {type:String, required: false},
});

//secure pasword using bcrypt
userSchema.pre("save",async function(next){
    const user = this;
    if(!user.isModified("password")){
        next();
    }
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password,saltRound);
        user.password = hash_password;
    }
    catch(error){
        next(error);
    }
});

//compare password function
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

//Json Web Token
userSchema.methods.generateToken = async function(){
try{
return jwt.sign({
    userId : this._id.toString(),
    email : this.email, 
},
process.env.JWT_KEY,
{
    expiresIn : "1d"
}

);

}
catch(error){
    console.error(error);
}
};

// decode token
const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        return decoded; // { userId: "...", email: "...", iat: ..., exp: ... }
    } catch (error) {
        console.error("Invalid or expired token:", error);
        return null;      

        
    }
};


const User = new mongoose.model("User",userSchema);
module.exports = User;