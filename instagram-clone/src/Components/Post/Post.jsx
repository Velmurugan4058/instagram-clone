import React, { useContext, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { AuthContext } from '../../context/AuthContext';

function Post({post}) {   
//after addcomment
const {user}=useContext(AuthContext)
const [commentText,setCommentText] = useState("");
const [postComments,setPostComments] = useState(post.comments || [])
//before adding comments
    const handleDelete = async()=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this post?")
    if(!confirmDelete) return;
    
    try{
        //  const response = await fetch(`http://localhost:5000/api/posts/${post._id}/`,{
       
        const response = await  fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}/`,{
            method:'Delete',
        })
if(response.ok){
    alert("Post deleted!")
    window.location.reload();
    }

 }
 catch(error){
    console.log("Error deleting post:",error)
 }
    }

    const[likeCount,setLikeCount] = useState(post.likes)

    const handleLike = async()=>{
      try{
        // const response = await fetch(`http://localhost:5000/api/posts/${post._id}/like`,{
       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}/like`,{
        method:'PUT',
       })

       if(response.ok){
    setLikeCount(likeCount+1)
    }
      } catch(error){
console.log("Error liking post:",error)
      } 
    }

    const handleComment = async(e)=>{
        e.preventDefault()
        if(!commentText.trim()) return;//prevents blank comments
        try{
            // const response = await fetch(`http://localhost:5000/api/posts/${post._id}/comment`,{
         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}/comment`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({text:commentText,username:user.username})
         });
         if(response.ok){
            const updatedPost = await response.json();
            setPostComments(updatedPost.comments);//instantly updates ui
            setCommentText("");//clears the input box
         }
        }catch(error){
           console.log("comment error:",error)
        }
        
    }
    return (
        // <div>

        //     <div className='bg-white border border-gray-200 rounded-lg max-w-[470px] w-full  pb-4'>
        //         {/*  1.post Header */}
        //         <div className='flex items-center justify-between p-3'>
        //             <div className='flex items-center gap-3'>
        //                 {/* Profile Picture placeholde */}
        //                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
        //                     <img src={'https://picsum.photos/150/150?random=${postNumber+10}'} alt='MY profile' className="bg-white w-full h-full rounded-full border-2 border-white" />
        //                 </div>
        //                 <span className='font-semibold text-sm'>velmurugan</span>
        //             </div>
        //             <MoreHorizIcon className="cursor-pointer" />
        //         </div>
        //         {/* 2.Post Image PlaceHolde */}

        //         <div className='w-full h-[470px] bg-gray-100 flex items-center border-y border-gray-200' >
        //           <img src={"https://picsum.photos/470/470?random=${postNumber}"} alt="post content" />
        //         </div>

        //         {/*3. Post Actions (like, coment,share) */}
        //         <div className="p-3 pb1">
        //             <div className="flex justify-between items-center mb-2">
        //                 <div className="flex gap-4">
        //                     <FavoriteBorderIcon className="cursor-pointer hover:text-gray-500 transition" />
        //                     <ChatBubbleIcon className="cursor-pointer hover:text-gray-500 transition" />
        //                     <SendIcon className="cursor-pointer hover:text-gray-500 transition" />
        //                 </div>
        //                 <BookmarkBorderIcon className="cursor-pointer hover:text-gray-500 transition" />
        //             </div>
        //             {/*likes and caption */}
        //             <p className='fnt-semibold text-sm mb-1'>1,024 likes</p>
        //             <p className='text-sm'> <span className='font-semibold mr-2'>velmurugan</span>Building My Mern stack Instagram Clone!🚀</p>
        //             <p className='text-gray-400 text-xs mt-1 cursor-pointer'>Viwe all 42 Comments</p>

        //         </div>


        //     </div>
        // </div>

         <div>

            <div className='bg-white border border-gray-200 rounded-lg max-w-[470px] w-full  pb-4'>
                {/*  1.post Header */}
                <div className='flex items-center justify-between p-3'>
                    <div className='flex items-center gap-3'>
                        {/* Profile Picture placeholde */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
                            <img src={`https://picsum.photos/seed/${post.username}/150/150`} alt='MY profile' className="bg-white w-full h-full rounded-full border-2 border-white" />
                        </div>
                        <span className='font-semibold text-sm'>{post.username}</span>
                    </div>
                    <button onClick={handleDelete}><DeleteIcon className="cursor-pointer text-red-500 hover:text-red-700 transition"  /></button>
                </div>
                {/* 2.Post Image PlaceHolde */}

                <div className='w-full h-[470px] bg-gray-100 flex items-center border-y border-gray-200' >
                  <img src={post.imageUrl} alt="post content" className='w-full object-cover' />
                </div>

                {/*3. Post Actions (like, coment,share) */}
                <div className="p-3 pb1">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex gap-4">
                            <FavoriteBorderIcon className="cursor-pointer hover:text-gray-500 transition" onClick={handleLike} />
                            <ChatBubbleIcon className="cursor-pointer hover:text-gray-500 transition" />
                            <SendIcon className="cursor-pointer hover:text-gray-500 transition" />
                        </div>
                        <BookmarkBorderIcon className="cursor-pointer hover:text-gray-500 transition" />
                    </div>
                    {/*likes and caption */}
                    <p className='fnt-semibold text-sm mb-1'>{likeCount} <b>likes</b></p>
                    <p className='text-sm'> <span className='font-semibold mr-2'>{post.username}</span>{post.caption}</p>
                    <p className='text-gray-400 text-xs mt-1 cursor-pointer'>View all 42 Comments</p>

                </div>
                {/* RENDER COMMENTS */}
                <div className='px-3 pb-2'>
                    {postComments.map((c,index)=>(
                        <p key={index} className='text-sm mb-1'><span className='font-bold mr-2'>{c.username}</span>{c.text}</p>
                    ))}
                </div>
                {/* COMMENT INPUT BOX*/}
                <form onSubmit={handleComment} className='flex border-t border-gray-200 p-3 mt-2' >
                    <input type="text" placeholder='Add a comment...' value={commentText} onChange={(e)=>setCommentText(e.target.value)} className='flex-1 focus:outline-none text-sm bg-transparent' />
            
                <button type='submit' className='text-blue-500 font-semibold text-sm hover:text-blue-700'>Post</button>
                </form>

            </div>
        </div>
    )

}

export default Post