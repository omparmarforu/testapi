const jwt = require("jsonwebtoken");

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
const decode = (token) =>{
    try{
        jwt.verify(token, env.JWT_KEY);
    }
    catch(err){
    console.error('Invalid token:', err);
    return null;
    }
}