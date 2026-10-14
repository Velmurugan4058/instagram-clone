import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Post from '../../Components/Post/Post'
import Stories from '../../Components/Stories/Stories'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'
import { Link } from 'react-router-dom'


function HomePage() {
  const [posts, setPosts] = useState([]);
  //Fetch posts from the backend when the page loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const response = await fetch('http://localhost:5000/api/posts/all')
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/all`)
        const data = await response.json()
        setPosts(data);

      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    fetchPosts();

  }, []);

  return (
    // <div className="flex">
    //   <Sidebar />

    //   {/* Main feed area */}
    //   <div className='ml-64  flex-grow bg-gray-50 min-h-screen flex justify-center pt-10 gap-16'>
    //     {/* We can render  the post twice to see how it scrools! */}
    //     <div className='flex flex-col items-center max-w-[470px] w-full'>
    //       <Stories />
    //       <Post postNumber={1} />
    //       <Post postNumber={2}/>
    //     </div>
    //     <RightSidebar/>
    //   </div>

    // </div>

    //fetching method to creata homepage
    // <div className='flex bg-gray-50 min-h-screen'>
    //   <Sidebar />
    //   <div className="flex flex-grow ml-60 pt-8 justify-center mt-8 ">
    //     <div className="w-full max-w-[470px] mr-16">
    //       <Stories />
    //       {/* If there are no posts , show a message . Otherwise,map through them! */}
    //       {posts.length === 0 ? (
    //         <p className='text-center text-gray-500 mt-10 font-semibold'>No Posts Yet. Go to Create and make one!</p>
    //       ) : (
    //         <div className='flex flex-col gap-6'>{posts.map((post) => (
    //           <Post key={post._id} post={post} />


    //         ))}

    //         </div>
    //       )}
    //     </div>
    //     <RightSidebar />
    //   </div>
    // </div>
    <div className='flex bg-gray-50 min-h-screen'>
      <Sidebar />
      <div className="flex flex-grow ml-60 pt-8 justify-center mt-8 ">
        <div className="w-full max-w-[470px] mr-16">
          <Stories />
          {/* If there are no posts , show a message . Otherwise,map through them! */}
          {posts.length === 0 ? (
            <p className='text-center text-gray-500 mt-10 font-semibold'>No Posts Yet. Go to Create and make one!</p>
          ) : (
            <div className='flex flex-col gap-6'>{posts.map((post) => (
              <div key={post._id}>
                <Link to={`/profile/${post.userId}`}><p className='font-semibold text-sm cursor-pointer hover:text-gray-500'>{post.username}</p></Link>
              <Post key={post._id} post={post} />
              </div>
              


            ))}

            </div>
          )}
        </div>
        <RightSidebar />
      </div>
    </div>

  )
}

export default HomePage