const http=require('http');
const express=require('express');
const mongoose=require('mongoose')
const {Server}=require('socket.io')
const cors = require('cors');
require('dotenv').config();

const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'*',
    }
});
app.use(cors());

io.on("connection",(socket)=>{
    console.log("User Connected:",socket.id);
})

app.get('/',(req,res)=>{
    res.send("Server is Running")
});

server.listen(process.env.PORT,(req,res)=>{
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
})

