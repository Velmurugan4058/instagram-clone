const express = require("express")
const router = express.Router()
const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer')

//1.connect to your  cloudinary account
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
console.log("testing cloud name:",process.env.CLOUDINARY_CLOUD_NAME)
//2.configure where the images should go 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:'instagram_clone', //create a folder in your cloudinary account
        allowedFormats:['jpeg','png','jpg'],
    }
})

const upload = multer({storage:storage})

//3.create the API endpoint
router.post('/',upload.single('image'),(req,res)=>{
    try{
        //req.file.path containesthe secure cloudinary URL for the uploaded img!
        res.status(200).json({imageUrl:req.file.path})
    }catch(error){
        res.status(500).json({message:"Image upload folder"})
    }
})

module.exports = router