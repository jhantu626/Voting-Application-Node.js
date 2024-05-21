const express=require('express')
const app=express();
require('dotenv').config();


//Database configuration importing
const db=require('./db')

const {jwtMiddleWare}=require('./jwt')


const bodyParser=require('body-parser')
app.use(bodyParser.json())


const log=(req,resp,next)=>{
    const date=new Date().toLocaleString();
    const method=req.method
    const url=req.url;
    console.log(`[${date}] | {${method}} | (${url})`);
    next();
}
app.use(log)


app.get('/welcome',log,(req,resp)=>{
    resp.json("Welcome to Voting Application").status(200);
})


const userRoutes=require('./routes/UserRoutes')
app.use('/users',userRoutes)

const candidateRoutes=require('./routes/CandidateRoutes')
app.use('/candidate',candidateRoutes)




const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Application is Running On port: ${PORT}`);
})