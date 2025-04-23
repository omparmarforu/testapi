const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

//const URI = "mongodb://localhost:27017/mern_admin";
//mongoose.connect(URI)
const URI = process.env.MONGODB_URI;

const connectDB = async()=>{
    try{
        await mongoose.connect(URI);
        console.log("connction success");

    }
    catch(error){
        console.error("connction failed");
        process.exit(0);
    }
}

module.exports = connectDB;