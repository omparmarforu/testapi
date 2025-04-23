require("dotenv").config();
const express = require("express");
const cors = require("cors");
const api = express();
const router = require('./router/auth-router');
const connectDB = require('./utils/db');

// Allow cross-origin requests
api.use(cors());

api.use(express.json());
api.use("/api/auth", router);

const port = 5000;
connectDB().then(() =>{
api.listen(port,'0.0.0.0',()=>{
    console.log(`Server is running on ${port}`);
});
});