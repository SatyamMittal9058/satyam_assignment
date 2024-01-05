const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
require('dotenv').config();
const server=express();
server.use(cors());
const userRoutes=require("./routes/userRoutes");
const urlRoutes=require("./routes/urlRoutes");;


server.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URL);
const database=mongoose.connection;
database.on("connected",()=>{
    console.log("mongodb connected");
});
server.use('/user',userRoutes);
server.use('/short',urlRoutes);
server.get('/check',(req,res)=>{
    console.log("check");
    res.send("check")
})
server.listen(4000);
