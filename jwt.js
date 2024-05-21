const jwt=require('jsonwebtoken')
require('dotenv').config();


const jwtMiddleWare=(req,resp,next)=>{
    if(!req.headers.authorization){
        return resp.json({msg: "Token not found!"}).status(401);
    }

    const token=req.headers.authorization.substring(7);
    if(!token){
        return resp.json({msg: "Unauthorized User!"}).status(401);
    }

    try{
        const payload=jwt.verify(token, process.env.JWT_SECRET);
        req.user=payload;
        console.log(payload);
        next();
    }catch(err){
        next(err)
    }
}


const genToken=(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET);
}


module.exports={jwtMiddleWare,genToken}