const express = require("express");
const app = express();

const mongoConnect = require("./db_connect");

mongoConnect();

app.get('/',(req,res)=>{
    res.send('hello');
})

app.listen(process.env.PORT,()=>{
    console.log(`app is listening at http://localhost:${process.env.PORT}}`);
});