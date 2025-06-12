require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const URI = process.env.MONGODB_URI;
const connectDB = async ()=>{
try{
await mongoose.connect(URI);
console.log("Connection Successfully Done");
}
catch(error){
console.error("Connection Failed");
process.exit(0); 
}
};

module.exports = connectDB;