const  mongoose = require("mongoose");
require("dotenv").config();

const mongoConnect = ()=>{
    mongoose.connect(process.env.DB_STRING).then(()=>{
        console.log("connected to mongo successfully");
    })
};

module.exports = mongoConnect;