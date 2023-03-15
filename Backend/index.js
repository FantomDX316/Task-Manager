const express = require("express");
const app = express();

const mongoConnect = require("./db_connect");

mongoConnect();
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('hello');
});

app.use("/api",require("./routes/taskRoute"));

app.listen(process.env.PORT,()=>{
    console.log(`app is listening at ${process.env.URL}`);
});