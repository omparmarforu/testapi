const express = require("express");
const api = express();
const router = require("./router/auth-router");
const connectDB = require("./utils/db");

api.use(express.json());
api.use("/api/auth/", router);

connectDB();

const PORT = 5000;
api.listen(PORT, ()=>{
console.log(`Server is running on port ${PORT}`);
});