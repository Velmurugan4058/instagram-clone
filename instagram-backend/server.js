const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');//import mongoose
// connect to the auth 
const authRoutes = require('./routes/auth')


require('dotenv').config();//load variables from .env file
const postRoutes = require('./routes/posts')
//1.initialize the express app
const app = express();

//2.set up Middleware
app.use(cors());//lets your react apptalk to this backend
app.use(express.json());//lets your backend read json data
app.use('/api/posts',postRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/upload',require('./routes/upload'))

//2.1 connect to mangodb
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB successfully connected!'))
.catch((err) => console.log('MongoDB connection errpr:',err));

//3.create a test route (an endpoint)
app.get('/',(req,res)=>{
    res.send('velmurugan\'s Instagram API is running Perfectly!');

})

//use the port from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})


//4.start the server
// const Port = 5000;
// app.listen(Port,()=>{
//     console.log(`server is running on port ${Port}`)
// })