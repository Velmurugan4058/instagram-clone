const multer = require('multer');
const multerS3 = require('multer-s3');
const {S3Client} = require('@aws-sdk/client-s3');

//connect to aws
const s3 = new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESSKEY_KEY,
    }
})

//CONFIGURE MULTER TO SEND FILES TO S3
const upload = multer({
    storage:multerS3({
        s3:s3,
        bucket:'instagram-profolio-velmurugan',
        contentType:multerS3.AUTO_CONTENT_TYPE,// ensure images open in browser instead of downloading
        key:function(req,file,cb){
            cb(null,Date.now().toString()+'-'+file.originalname);
        }
    })
})

module.exports = upload;