import React, { useEffect, useState } from 'react'

function ExplorePage() {
    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    
    useEffect(()=>{
        const fetchExplorePosts = async ()=>{
            try{
                 const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`)
                 if (response.ok){
                    const data = await response.json()
                    setPosts(data)
                 }
            }catch(error){
            console.error("Error fetching explore posts:",error)
            }finally{
                setLoading(false)
            }
        }
        fetchExplorePosts();
    },[])
  return (
    <div className='max-w-4xl mx-auto pt-6 px-2 md:px-4 min-h-screen bg-gray-50'>
        {loading?
        (<div className='text-center py-10 font-bold text-gray-500'>Loading Explore...</div>):
        (<div className='grid grid-cols-3 gap-1 md:gap-4'>
            {posts.map((post)=>(
            <div key={post._id} className='relative group aspect-square cursor-pointer bg-gray-200'>
                <img src={post.imageUrl} alt="ExplorePost" className='w-full h-full object-cover'/>
            {/* Instagram-style hover overlay */}
            <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justigy-center opacity-0 group-hover:opacity-100'>
                <p className='text-white font-semibold text-xs md:text-sm text-center px-2 truncate w-full'>
                    {post.caption || "Viwe Post"}
                </p>
            </div>
            </div>
        ))}
        </div>
        )}
    </div>
  )
}

export default ExplorePage