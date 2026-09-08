import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore'
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon  from '@mui/icons-material/FavoriteBorder';
import AddBoxIcon  from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../../context/AuthContext';

function Sidebar() {
    const menuItems = [
        { name: "Home", icon: <HomeIcon fontSize="medium" />,path:"/" },
        { name: "Search", icon: <SearchIcon fontSize="medium" /> ,path:"/search" },
        { name: "Explore", icon: <ExploreIcon fontSize="medium" />,path:"#" },
        { name: "Reels", icon: <SlideshowIcon fontSize="medium" /> ,path:"#"},
        { name: "Message", icon: <ChatIcon fontSize="medium" />,path:"/message" },
        { name: "Notifications", icon: <FavoriteBorderIcon fontSize="medium" />,path:"#" },
        { name: "Create", icon: <AddBoxIcon fontSize="medium" /> ,path:"/create"},
        { name: "Profile", icon: <AccountCircleIcon fontSize="medium" /> ,path:"/profile"},
 ];
 const {logout} = useContext(AuthContext)
    return (
        <div className='fixed top-0 left-0 h-screen w-64 border-r border-gray-300 bg-whitep-5 flex-col'>
            {/* instagram logo Text */}
            <div className='mb-10 mt-2 text-2xl font-bold cursor-pointer font-serif tracking-wider'>Instagram</div>

            {/* Navigation Links */}
            <div>
                {menuItems.map((item, index) => (
                    <Link to={item.path} key={index} className='flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200'>
                        {item.icon}
                        <span className='text-base font-medium'> {item.name}</span>


                    </Link>
                ))}
            </div>

            <button onClick={logout} className='mt-auto mb-4 bg-red-500 text-white p-2 rounded-lg font-semibold hover:bg-red-600 transition'>Log Out</button>


        </div>
    )
}

export default Sidebar