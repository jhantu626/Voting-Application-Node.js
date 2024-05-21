const mongoose=require('mongoose')
require('dotenv').config();

const con=async()=>{
    await mongoose.connect(process.env.MONGO_URI);
}

con();

const db=mongoose.connection

db.on('connected',()=>{
    const date=new Date().toLocaleString();
    console.log(`Mongodb connection established at ${date}`)
})

db.on('disconnected',()=>{
    const date=new Date().toLocaleString();
    console.log(`Mongodb connection disconnected at ${date}`)
})

db.on('error',(err)=>{
    console.log(err);
})


module.exports=db;