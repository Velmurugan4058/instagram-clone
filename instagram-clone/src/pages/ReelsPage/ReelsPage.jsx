import React, { Profiler } from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore'
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

function ReelsPage() {
    const menuItems = [
        { name: "Home", icon: <HomeIcon fontSize="medium" />, path: "/" },
        { name: "Search", icon: <SearchIcon fontSize="medium" />, path: "/search" },
        { name: "Explore", icon: <ExploreIcon fontSize="medium" />, path: "/explore" },
        { name: "Reels", icon: <SlideshowIcon fontSize="medium" />, path: "/reels" },
        { name: "Message", icon: <ChatIcon fontSize="medium" />, path: "/message" },
        { name: "Notifications", icon: <FavoriteBorderIcon fontSize="medium" />, path: "notifications" },
        { name: "Create", icon: <AddBoxIcon fontSize="medium" />, path: "/create" },
        { name: "Profile", icon: <AccountCircleIcon fontSize="medium" />, path: "/profile" },

    ];
    const reelItems = [
        { name: "Like", icon: <FavoriteBorderIcon fontSize="medium" /> },
        { name: "Comment", icon: <ChatIcon fontSize="medium" /> },
        { name: "Share", icon: <SendOutlinedIcon fontSize="medium" /> },
        { name: "Repost", icon: <RepeatOutlinedIcon fontSize="medium" /> },
        { name: "Save", icon: <BookmarkBorderOutlinedIcon fontSize="medium" /> },
    ]

    const dummyReel = [
        {
        id:1,
        videoUrl:"https://res.cloudinary.com/zrlvauug/video/upload/v1790950991/Wukong_Monkey_King___uvigamer__wukong__monkeyking__wukongblackmyth_MP4.mp4",
        ProfileImageUrl:"https://picsum.photos/200/200?random=$1",
        userName:"BlackMythWukong"
        },
        {
        id:2,
        videoUrl:"",
        ProfileImageUrl:"https://picsum.photos/200/200?random=$2",
        userName:"Spider-man"
        },
        {
        id:3,
        videoUrl:"https://res.cloudinary.com/zrlvauug/video/upload/v1790951022/Kratos_Talking_To_The_World_Serpent_J%C3%B6rmungandr___God_Of_War_4_Gameplay___God_Of_War_4___God_Of_War_MP4.mp4",
        ProfileImageUrl:"https://picsum.photos/200/200?random=$3",
        userName:"GodOfWar"
        }
]
    return (
        <div className='flex w-full h-screen overfloww-hidden bg-white '>
            <div className='hidden md:flex flex-col w-[250px] h-full bg-gray-50 border-rborder-gray-300 p-4'>
                <h1 className='text-2xl font-bold mb-10 px-2 '><b>Reels</b></h1>
                <div className="flex flex-col gap-2">
                    {menuItems.map((item, index) => (
                        <Link to={item.path} key={index} className='flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-700 transition-all duration-200'>
                            {item.icon}
                            <span className='text-base font-medium'> {item.name}</span>

                        </Link>
                    ))}
                </div>
            </div>

            <div className='flex-1 h-full overflow-y-scroll bg-gray-100 flex flex-col items-center py-6 snap-mandatory'>
                {dummyReel.map((reel)=>(
                <div key={reel.id} className='relative w-[350px] h-[650px] bg-black rounded-xl snap-center shadow-lg flex-shrink-0 text-white flex items-center justify-center overflow-hidden' >
               <video src={reel.videoUrl} className='w-full h-full object-cover rounded' autoPlay loop muted></video>
                
                
                    <div className='absolute bottom-4 left-4 flex items-center gap-3 z-10 '>
                        <div className='bg-gray-400 h-10 w-10 rounded-full border-2 border-white cursor-pointer '><img src={reel.ProfileImageUrl} alt="profile" className='h-full w-full object-cover rounded-full ' /></div>
                        <h1 className='text-sm fomt-bold drop-shadow-md cursor-pointer ' >{reel.userName}</h1>
                        <button className='border border-white px-3 py-1 text-xs font-bold rounded-md bg-blue-500 hover:bg-white text-black transition-colors'>Follow</button>
                    </div>


                    <div className='absolute bottom-[100px] right-4 flex flex-col items-center gap-5 z-10'>
                        {reelItems.map((item, index) => (
                            <div key={index} className='flex flex-col items-center cursor-pointer hover:opacity-70 transition-opacity drop-show-md'>{item.icon}
                             <span className='text-[10px] mt-1 font-medium'> {item.name}</span> 
                             </div>
                        ))}

                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default ReelsPage