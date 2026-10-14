const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');//import mongoose
// connect to the auth 
const authRoutes = require('./routes/auth')
// Aws bucket import the middleware you just created
const upload = require('./middleware/upload');
const Post = require('./modules/post')
require('dotenv').config();//load variables from .env file
const postRoutes = require('./routes/posts')
//import message.js
const Message = require('./modules/message')
//import user.js
const User = require('./modules/user')
//import http
const http = require('http');
const{Server} = require('socket.io')

const Notification = require('./modules/notification')
//1.initialize the express app
const app = express();

const server = http.createServer(app)
//configure scoket.io to allow connections from your react frontend
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",//ensure this matches your vite frontend port
        methods:["GET","POST"]
    }
})

//2.set up Middleware
app.use(cors());//lets your react apptalk to this backend
app.use(express.json());//lets your backend read json data
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', require('./routes/upload'))

//2.1 connect to mangodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB successfully connected!'))
    .catch((err) => console.log('MongoDB connection errpr:', err));

//3.create a test route (an endpoint)
app.get('/', (req, res) => {
    res.send('velmurugan\'s Instagram API is running Perfectly!');

})

//create the api router for react to call
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No File uploaded.' })
    }
    //AWS SUCCESSFULLY UPLOADED THE FILE AND RETURNED A PUBLIC URL
    const publicImageUrl = req.file.location;
    //send the URL back to react so it can be saved in mongoDB
    res.status(200).json({ ImageUrl: publicImageUrl })
})


app.post('/api/posts', async (req, res) => {
    try {
        const { imageUrl, caption } = req.body;
        //create a new entry in the database
        const newPost = new Post({ imageUrl, caption });
        await newPost.save();//permanently save it to maongoDB 
        res.status(201).json({ message: "Post saved successfully" })
    } catch (error) {
        console.error("Database error:", error)
        res.status(500).json({ error: 'Failed to save post to database.' })
    }

})

app.get('/api/users',async(req,res)=>{
    try{
        //.select ('-password') ensure we DO NOT send passwords to the frontend for security
        const users = await User.find().select('-password');
        res.status(200).json(users)
 }catch(error){
    console.error("Fetch Users error:",error)
    res.status(500).json({error:"Failed to fetch users"})
 }
})
app.get('/api/posts',async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = 15
        const skip = (page -1)*limit

        const posts = await Post.find()
        .sort({createAt:-1})
        .skip(skip)
        .limit(limit)
        res.status(200).json(posts) 
    }catch(error){
        console.error("Error fetching posts:",error)
        res.status(500).json({error:"Faild to fetch posts."})
    }
})

//send a message
app.post('/api/messages/send',async(req,res)=>{
    try{
        const{senderId,receiverId,text}= req.body;

        const newMessage = new Message({
            senderId,
            receiverId,
            text
        })
        await newMessage.save();
        res.status(201).json(newMessage);

    }catch(error){
        console.error("send message error:",error)
        res.status(500).json({error:"Failed to send message"})
    }
})

// get chat history between two users
app.get('/api/messages/:senderId/:receiverId',async(req,res)=>{
    try{
      const{senderId,receiverId}= req.params;
      //find all messages where these two users are the sender/receiver
      const messages = await Message.find({
        $or:[
            {senderId:senderId,receiverId:receiverId},
            {senderId:receiverId,receiverId:senderId}
        ]

      }).sort({createdAt:1});//sort by oldest to newest
      res.status(200).json(messages)
    }catch(error){
        console.error('Fetch Messages Error:',error)
        res.status(500).json({error:"Faild to fetch messages."})
    }
})

app.get('/api/notifications/:userId',async(req,res)=>{
    try{
        const notifications = await Notification.find({receiverId:req.params.userId})
        .populate('senderId','username profilePic')
        .sort({createdAt:-1});//bring least notification first
        res.status(200).json(notifications);
    }catch(error){
        res.status(500).json({error:"Failed to fetch notifications"})
    }
})
//Real time chat engine
io.on("connection",(socket)=>{
    console.log("A user connected to chat:",socket.id)
    //
    socket.on("send_message",(data)=>{
        console.log("Message received:",data)
         socket.broadcast.emit("receive_message",data)
    })
    socket.on("disconnect",()=>{
        console.log("User disconnected:",socket.id)
    })
})

// 1. Follow a User
app.put('/api/users/:id/follow', async (req, res) => {
  try {
    const userToFollowId = req.params.id; // The profile we are looking at
    const currentUserId = req.body.currentUserId; // Our logged-in ID

    if (userToFollowId === currentUserId) {
      return res.status(403).json({ error: "You cannot follow yourself" });
    }

    const userToFollow = await User.findById(userToFollowId);
    const currentUser = await User.findById(currentUserId);

    // If we are not already following them
    if (!userToFollow.followers.includes(currentUserId)) {
      await userToFollow.updateOne({ $push: { followers: currentUserId } });
      await currentUser.updateOne({ $push: { following: userToFollowId } });
      res.status(200).json({ message: "User has been followed" });
    } else {
      res.status(403).json({ error: "You already follow this user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to follow user" });
  }
});

// 2. Unfollow a User
app.put('/api/users/:id/unfollow', async (req, res) => {
  try {
    const userToUnfollowId = req.params.id;
    const currentUserId = req.body.currentUserId;

    if (userToUnfollowId === currentUserId) {
      return res.status(403).json({ error: "You cannot unfollow yourself" });
    }

    const userToUnfollow = await User.findById(userToUnfollowId);
    const currentUser = await User.findById(currentUserId);

    // If we are currently following them
    if (userToUnfollow.followers.includes(currentUserId)) {
      await userToUnfollow.updateOne({ $pull: { followers: currentUserId } });
      await currentUser.updateOne({ $pull: { following: userToUnfollowId } });
      res.status(200).json({ message: "User has been unfollowed" });
    } else {
      res.status(403).json({ error: "You don't follow this user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to unfollow user" });
  }
});
//use the port from .env
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})



//4.start the server
// const Port = 5000;
// app.listen(Port,()=>{
//     console.log(`server is running on port ${Port}`)
// })