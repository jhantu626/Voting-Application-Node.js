const mongoose=require('mongoose')

const candidateSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true,
        enum: ["BJP","TMC","CPIM","CONGRESS","AAP"]
    },
    age: {
        type: Number,
        required: true
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            votedAt: {
                type: Date,
                defalut: Date.now
            }
        }
    ],
    voteCount: {
        type:Number,
        default: 0
    }
})

const Candidate=mongoose.model('Candidate',candidateSchema);
module.exports=Candidate;