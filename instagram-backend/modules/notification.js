const mongoose = require('mongoose')
const notificationSchma = new mongoose.Schema({
    receiverId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    senderId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    type:{type:String, enum:['like','comment','follow'],required:true},
    postId:{type:mongoose.Schema.Types.ObjectId, ref:'Post'},
    isRead:{type: Boolean,default:false}

},{timestamps:true})
module.exports = mongoose.model('Notification',notificationSchma)