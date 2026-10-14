const mongoose = require("mongoose")
//1. define the blueprint (Schema) for an  Instagram post 
const postSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        default:"",
        required:true
    },
    likes:{
        type:Number,
        default:0 //New posts start with 0 likes
    },
    comments:[{
        text:String,
        username:String
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    


},{
    timestamps:true//Automatically adds "CreatedAt" and "UpdatedAt" times!
})

//2. export the model so our server can use it
module.exports = mongoose.model('post',postSchema);