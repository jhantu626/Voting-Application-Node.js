const express=require('express')
const app=express();
require('dotenv').config();

const bodyParser=require('body-parser')
app.use(bodyParser.json())



app.get('/welcome',(req,resp)=>{
    resp.json("Welcome to Voting Application").status(200);
})




const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Application is Running On port: ${PORT}`);
})