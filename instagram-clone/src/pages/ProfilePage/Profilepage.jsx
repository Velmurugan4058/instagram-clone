import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useParams } from 'react-router-dom';
//basic profile page model
// import Sidebar from '../../Components/Sidebar/Sidebar'
// import GridOnIcon from '@mui/icons-material/GridOn'
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
// import PersonPinIcon from '@mui/icons-material/PersonPin'

//user posts include profile page


// function Profilepage() {
//     //Array of mock posts for the profile grid 
//     const userPosts = [1, 2, 3, 4, 5, 6]
//     return (
//         <div className='flex bg-gray-50 min-h-screen'>
//             <Sidebar />
//             {/*Main profile container */}
//             <div className="ml-64 px-10 py-8 flex-grow  min-h-screen flex flex-col items-center max-w-5xl mx-auto ">
//                 {/*1. profile picture*/}
//                 <div className='flex items-center gap-16 mb-12 border-b border-gray-300 pb-12 w-full max-w-3xl'>
//                     <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[3px] flex-shrink-0">
//                         <img src={'https://picsum.photos/seed/velmurugan/200/200'} alt='MY profile' className='w-full h-full rounded-full border-4 border-white object-cover' />
//                     </div>
//                     {/*Profile info& stats */}
//                     <div className="flex flex-col gap-4 flex-grow">
//                         <div className="flex items-center gap-4">
//                             <span className='text-xl font-normal text-gray-800'>VelMurugan</span>
//                             <button className='bg-gray-200 hover:bg-gray-300 text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition'>Edit Profile</button>
//                             <button className='bg-gray-200 hover:bg-gray-300 text-black px-4 py-1.5 rounded-lg font-semibold text-sm transition'>View Archive</button>
//                         </div>

//                         {/*Stats Row */}
//                         <div className="flex gap-8 text-sm">
//                             <span><strong>6</strong>Posts</span>
//                             <span><strong>1,245</strong>followers</span>
//                             <span><strong>480</strong>following</span>
//                         </div>
//                         {/* bio */}
//                         <div>
//                             <p className='font-semibold text-sm'>Velmurugan</p>
//                             <p className='text-sm text-gray-600'>Building my MERN stack Instagram Clone</p>
//                             <p className='text-sm text-blue-900 font-medium cursor-pointer'>github.com/velmurugan</p>
//                         </div>
//                     </div>
//                 </div>
//                 {/* 2.Profile Tab (Posts,saved, Tagged) */}
//                 <div className="flex gap-12 border-t border-gray-300 mb-6 text-xs font-semibold tracking-widest text-gray-500">
//                     <div className="flex items-center gap-1 pt3 border-t border-black text-black cursor-pointer">
//                         <GridOnIcon fontsize="small" />
//                         <span>POSTS</span>
//                     </div>
//                     <div className="flex items-center gap-1 pt-3 cursor-pointer hover:text-black">
//                         <BookmarkBorderIcon fontsize="small" />
//                         <span>SAVED</span>
//                     </div>
//                     <div className="flex items-center gap-1 pt-3 cursor-pointer hover:text-black">
//                         <PersonPinIcon fontsize="small" />
//                         <span>TAGGED</span>
//                     </div>
//                 </div>
//                 {/* 3.photo grid selection */}
//                 <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
//                     {userPosts.map((postId)=>(
//                         <div key={postId} className="h-72 bg-gray-200 rounded-md overflow-hidden cursor-pointer relative group">
//                             <img src={`https://picsum.photos/seed/post${postId}/400/400`} alt="user post" className='w-full h-full  object-cover group-hover:scale-105 transition duration-300'/>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </div>
//     )
// }

function Profilepage() {
    const { user } = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([])


    const { userId } = useParams()
    const [profileData, setProfileData] = useState(null)
    const [isFollowing, setIsFollowing] = useState(false)
    const targetUserId = userId || user?.id;

    //before Add users id
    //     useEffect(()=>{
    //         const fetchUserPosts = async ()=>{
    //          try{
    //             // const res = await fetch('http://localhost:5000/api/posts/all');
    //             const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/all`);

    //             const data = await res.json();

    //             // filter out only the posts made by the currently logged-in user
    //             const filteredPosts = data.filter(post => post.username === user.username);

    //             //reverse so the newest posts appear at the top
    //             setUserPosts(filteredPosts.reverse());

    //          }catch(error){
    //             console.log("error fetching profile posts:",error)
    //          }
    //         }
    //         if(user){
    //             fetchUserPosts();
    //          }
    //     },[user]);
    //     if(!user) return <div className='text-center mt-10'>Loading...</div>
    //    console.log("my profile posts:",userPosts)

    //after add users id
    useEffect(() => {
        if (!targetUserId) return
        //1.fetch profile info & check follow status
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
                const allUsers = await response.json();
                const currentProfile = allUsers.find(u => u._id === userId);

                if (currentProfile) {
                    setProfileData(currentProfile);
                    //check if logged in user in this profiles followres list
                    setIsFollowing(currentProfile.followers?.includes(user?.id))
                }
            } catch (error) {
                console.error("Error fetching profile:", error)
            }
        }
        //2. fetch posts for this profile
        useEffect(() => {
            const fetchUserPosts = async () => {
                try {
                    // const res = await fetch('http://localhost:5000/api/posts/all');
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts?userId=${userId}`);
                    if (res.ok) {
                        const data = await res.json();
                        setUserPosts(data);
                    }
                } catch (error) {
                    console.log("error fetching profile posts:", error)
                }
            }
            if (userId) {
                fetchProfile()
                fetchUserPosts();

            }
        }, [userId, user]);

        //3. follow / unfollow logic
        const handleFollowToggle = async () => {
            try {
                const endpoint = isFollowing ? 'unfollow' : 'follow';
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}/${endpoint}`, {
                    method: "PUT",
                    headers: { "Content-Type": "Application/json" },
                    body: JSON.stringify({ currentUserId: user.id })
                })
                if (response.ok) {
                    setIsFollowing(!isFollowing)
                    //optional :update followers count instantly on screen 
                    setProfileData(prev => ({
                        ...prev, followers: isFollowing ? prev.followers.filter(id => id !== user.id) // remove if unfollowing
                            : [...(prev.followers || []), user.id]
                    }))
                }
            } catch (error) {
                console.error("follow error:", error)
            }
        }
        if (!profileData) return <div className='text-center mt-10'>loading...</div>
    })


    return (
        // <div className='max-w-4xl mx-auto pt-10 px-4 w-full'>
        //     {/* profile header section */}
        //     <div className="flex gap-10 items-center border-b border-gray-300 pb-10 mb-10">
        //     <div className="w-32 h-32 bg-gary-200 rounded-full border-gray-300 flex items-center justify-center text-4xl overfolw-hidden">
        //         <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" />
        //     </div>
        //     <div>
        //         <h2 className='text-3xl font-light mb-4'>{user.username}</h2>
        //         <div className='flex gap-6 mb-4'>
        //             <p><strong>{userPosts.length}</strong>posts</p>
        //             <p><strong>1200</strong>followers</p>
        //             <p><strong>3</strong>following</p>
        //         </div>
        //         <p className='font-semibold'>{user.username}</p>
        //         <p className='text-sm'>Build my MERN stack portfolio!</p>
        //     </div>
        //     </div>


        //     {/* Posts grid section */}
        //     <div className="grid grid-cols-3 gap-1 md:gap-4">
        //         {userPosts.length === 0 ? (
        //             <p className='col-span-3 text-center text-gray-500 mt-10'>No posts yet. Go create one!</p>
        //         ) :(userPosts.map((post)=>(
        //             <div key={post._id} className='aspect-square bg-gray-100 overflow-hidden group relative cursor-pointer'>    
        //                 <img src={post.imageUrl} alt="Post" className='w-full h-full object-cover transition-transform group-hover:scale-105' />
        //         {/* Hover effect */}
        //         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
        //             <span className='text-white font-bold'>❤️12</span>
        //         </div>
        //         </div>
        //         )))}
        //     </div>


        // </div>
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 pt-10">
            <div className="w-full max-w-4xl px-4">

                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 border-b border-gray-300 pb-10">
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-4xl font-bold text-gray-500 uppercase">
                        {profileData?.username.charAt(0)}
                    </div>

                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-normal">{profileData?.username}</h1>

                            {/* Dynamic Button: Edit vs Follow */}
                            {user?.id === userId ? (
                                <button className="bg-gray-200 text-black px-4 py-1.5 rounded-lg font-semibold text-sm hover:bg-gray-300">
                                    Edit Profile
                                </button>
                            ) : (
                                <button
                                    onClick={handleFollowToggle}
                                    className={`px-6 py-1.5 rounded-lg font-semibold text-sm transition-colors ${isFollowing ? "bg-gray-200 text-black" : "bg-blue-500 text-white"
                                        }`}
                                >
                                    {isFollowing ? "Unfollow" : "Follow"}
                                </button>
                            )}
                        </div>

                        <div className="flex gap-8 mt-2">
                            <p><span className="font-bold">{userPosts.length}</span> posts</p>
                            <p><span className="font-bold">{profileData.followers?.length || 0}</span> followers</p>
                            <p><span className="font-bold">{profileData.following?.length || 0}</span> following</p>
                        </div>
                    </div>
                </div>

                {/* Posts Grid Area */}
                <div className="grid grid-cols-3 gap-1 md:gap-4 pb-10 mt-10">
                    {userPosts.map((post) => (
                        <div key={post._id} className="aspect-square bg-black overflow-hidden relative cursor-pointer">
                            <img src={post.imageUrl || post.videoUrl} alt="Post" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}



export default Profilepage