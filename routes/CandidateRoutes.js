const express=require('express')
const router=express.Router();
const {jwtMiddleWare,genToken}=require('./../jwt')
const Candidate=require('./../Models/Candidate')
const User=require('./../Models/User')

const checkAdminOrNot=async(userId)=>{
    try{
        const user=await User.findById(userId);
        return user.role==="admin";
    }catch(err){
        return false;
    }
}

router.post('/',jwtMiddleWare,async (req,resp)=>{
    try{
        const adminOrNot=await checkAdminOrNot(req.user.user.id);
        if(!adminOrNot){
            console.log("User is not admin");
            return resp.json({msg: "User is not Admin!"}).status(401);
        }
        const data=req.body
        const newCandidate=new Candidate(data);
        const response=await newCandidate.save();
        resp.json(response).status(200);
    }catch(err){
        resp.json(err).status(500);
    }
})


router.get('/',async(req,resp)=>{
    try{
        const candidates=await Candidate.find();
        resp.json(candidates).status(200);
    }catch(err){
        console.log(err);
        resp.json({err: "Internal Server Error!"}).status(500);
    }
})



router.put('/:candidateId',jwtMiddleWare,async(req,resp)=>{
    try{
        const adminOrNot=await checkAdminOrNot(req.user.user.id);
        if(!adminOrNot){
            return resp.json("Unauthorize user!");
        }
        const candidateId=req.params.candidateId;
        const updateData=req.body;
        const response=await Candidate.findByIdAndUpdate(candidateId,updateData,{new: true});
        if(!response){
            return resp.json({err: "Candidate Not Found!"}).status(404);
        }
        resp.json(response).status(200);
    }catch(err){
        resp.json(err).status(500);
    }
})


router.delete('/:candidateId',jwtMiddleWare,async(req,resp)=>{
    try{
        const adminOrNot=await checkAdminOrNot(req.user.user.id);
        if(!adminOrNot){
            return resp.json({msg: "User is not Authorize to use this url!"}).status(401);
        }
        const candidateId=req.params.candidateId;
        const response=await Candidate.findByIdAndDelete(candidateId);
        if(!response){
            return resp.json({err: "Candidate Not Found!"}).status(404);
        }
        resp.json({msg: "Candidate Deleted Successfully"}).status(200);
    }catch(err){
        resp.json(err).status(500);
    }
});


router.post('/vote/:candidateId',jwtMiddleWare,async(req,resp)=>{
    const candidateId=req.params.candidateId;
    const userId=req.user.user.id;

    try{
        const candidate=await  Candidate.findById(candidateId);
        if(!candidate){
            return resp.json({msg: "Candidate Not Found!"});
        }        

        const user=await User.findById(userId);
        if(user.isVoted){
            return resp.json("You have already voted").status(403);
        }
        if(user.role=='admin'){
            return resp.json("Admin Not Allowed").status(403);
        }

        candidate.votes.push({user: userId});
        candidate.voteCount++;
        await candidate.save();

        user.isVoted=true;
        await user.save();
        resp.json({msg: "Vote recorded Successfully"}).status(200);
    }catch(err){
        console.log(err);
        resp.json({err: "Internal Server error"}).statuus(500);
    }
})

router.get('/vote/count',async(req,resp)=>{
    try{
        const candidates=await Candidate.find().sort({voteCount: 'desc'})
        const finalData=candidates.map(data=>{
            return {
                name: data.name,
                party: data.party,
                voteCount: data.voteCount
            }
        })
        resp.json(finalData).status(200);
    }catch(err){
        resp.json({err: "Internal Server Error!"}).status(500);
    }
})



module.exports=router;