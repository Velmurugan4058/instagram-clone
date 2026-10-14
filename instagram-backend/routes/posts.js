const express = require('express');
const router = express.Router();
const Post = require('../modules/post');//imoprt the post blueprint

router.post('/add', async (req, res) => {
    try {
        //
        const { username, imageUrl, caption } = req.body;
        //
        const newPost = new Post({
            username: username,
            imageUrl: imageUrl,
            caption: caption
        })

        //
        const savePost = await newPost.save();
          res.status(201).json(savePost);

        
        //
      
        
    }
    catch (error) {
        console.log(" backend crash detail:",error)
        res.status(500).json({ message: "Failed to create post", error: error })
        
    }

});

router.get('/all',async (req,res)=>{
try{
    const posts = await Post.find().sort({createdAt:-1});
    res.status(200).json(posts);//Use res.status , not res.posts!

}catch(error){
res.status(500).json({message:'Failed to Fetch posts',error:error})
}

})

router.delete('/:id',async(req,res)=>{
    try{

        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'post deleted successfully'})
}catch(error){
    res.status(500).json({message:'fapled to de;ete post',error:error})
}
})

router.put('/:id/like',async(req,res)=>{
    try{
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {$inc:{likes:1}},
            {new:true}
        )
        res.status(200).json(updatedPost);
    }
    catch(error){
res.status(500).json({message:'Failed to like post',error:error})
    }
})

//commont rout(/api/posts/:id/comment)
router.put('/:id/comment',async(req,res)=>{
    try{
        const comment = {
            text:req.body.text,
            username:req.body.username
        }

        const updatePost = await Post.findByIdAndUpdate(
            req.params.id,
            {$push:{comments:comment}},
            {new:true} //returns the update post data
 )
 res.status(200).json(updatePost);
    }
    catch(error){
        res.status(500).json({message:'Failed to add comment'})
    }

})

//Create new post 
router.post('/',async(req,res)=>{
try{
    const newPost= new Post({
        username: req.body.username,
        imageUrl:req.body.imageUrl,
        caption:req.body.caption
    })
    //save to mongaDB
    const savePost = await newPost.save();
    res.status(200).json(savePost)
}
catch(error){
    console.log("Error saving the post:",error)
    res.status(500).json({message:"Failed to save post to database"})
}
})

module.exports = router;