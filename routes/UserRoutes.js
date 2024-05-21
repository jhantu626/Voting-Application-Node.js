const express=require('express')
const router=express.Router();

const User=require('./../Models/User')
const {jwtMiddleWare,genToken}=require('./../jwt')

router.post('/signup',async(req,resp)=>{
    try{
        const user=req.body;
        const newUser=new User(user)
        const savedUser=await newUser.save();
        const payload={user: {
            id: savedUser.id
        }}
        const token=genToken(payload);
        console.log(token);
        resp.json({token: token}).status(200);    
    }catch(err){
        resp.json(err.errmsg).status(500)
    }
})

router.get('/login',async(req,resp)=>{
    try{
        const {aadharCardNo,password}=req.body;
        const user=await User.findOne({aadharCardNumber: aadharCardNo});
        if(!user || !user.comparePassword(password)){
            return resp.json({msg: "Invalid Credentials!"}).status(401);
        }

        const payload={user: {
            id: user.id
        }}
        const token=genToken(payload);
        resp.json({token:token}).status(200);
    }catch(err){
        return resp.json({msg: "Internal Server error!"}).status(500);
    }
})


router.get('/profile',jwtMiddleWare,async(req,resp)=>{
    try{
        const userData=req.user;
        const userId=userData.user.id;
        const user=await User.findById(userId).select('-password');
        resp.json({user: user}).status(200);

    }catch(err){
        return resp.json({msg: "Internal Server error!"}).status(500);
    }
})

router.put('/profile/password',jwtMiddleWare,async(req,resp)=>{
    try{
        const userId=req.user.user.id;
        const {currentPassword,newPassword}=req.body

        const user=await User.findById(userId);
        
        if(!user || !user.comparePassword(currentPassword)){
            return resp.json("Unauthorized users!").status(401);
        }

        user.password=newPassword;
        await user.save();
        resp.json({msg: "Password Updated"}).status(200);

    }catch(err){
        resp.json(req).status(500);
    }
})


module.exports=router;