const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
"username": {type: String, required: true},
"email" : {type: String, required: true},
"countrycode" : {type:String, required: true},
"mobileno" : {type:Number, required: true},
"password" : {type: String, required: true},
"age" : {type:Number, required: true},
"gender" : {type: String, required: true},
"dob" : {type:Date, required: true},
});

const User = new mongoose.model("User",userSchema);
module.exports = User;
