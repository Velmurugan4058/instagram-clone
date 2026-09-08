import React, { useState } from 'react'

function RightSidebar() {
    //Array of Suggested Friends
    const Suggestions = [
        { id: 1, username: "itz me vishnusrini",subtitles:"Followed by srinivishnu"},
        { id: 2, username: "mr.lee",subtitles:"New to Instagram" },
        { id: 3, username: "melwin",subtitles:"Suggested for you" },
        { id: 4, username: "seeman",subtitles:"Followed by manivel" },
        { id: 5, username: "nurath",subtitles:"Followed by melwin" },
        { id: 6, username: "nethaji",subtitles:"Followed by seeman" },
        { id: 7, username: "itz me srinivishnu",subtitles:"Followed by vishnusrini" },
        { id: 8, username: "vikram",subtitles:"Followed by vishnu" },
        { id: 9, username: "dr.pyscho",subtitles:"Followed by nuraht" },
        { id: 10, username: "abi",subtitles:"Followed by nethaji" },
    ]

   

  
    return (
        <div className='w-[320px] mt-4 hidden lg:block'>
            {/*1. user profile area */}
            <div className='flex items-center justify-between mb-6'>
                <div className="flex items-center gap-4 curser-pointer">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-items-center justify-center border border-gray-300 overflow-hidden">
                        <img src={'https://picsum.photos/150/150?random=${postNumber+10}'} alt='My profile' className='text-gray-500 text-xs font-bold'  />
                    </div>
                    <div>
                        <p className='text-blue-500 font-semibold text-sm'>Velmurugan</p>
                        <p className='text-gray-500 text-sm'>master_vel06</p>
                    </div>

                </div>
                <button className='font-semibound text-blue-500 text-xs hover:text-blue-900 transition'>Switch</button>
            </div>
            {/*2.Suggested Header */}
            <div className="flex items-center justify-between mb-4">
             <p className='font-semibold text-gray-500 text-sm'>Suggested for you</p>
             <button className='text-black font-semibold text-xs hover:text-gray-500 transtion'>See All</button>
            </div>
            { /*3.Suggestion List */}
            <div className="flex flex-col gap-4 mb-10">
                {Suggestions.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                        <div className='flex itens-center gap-3 cursor-pointer'>
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex-items-center justify-center border border-gray-300 overflow-hidden cursor-pointer">
                                <img src={`https://picsum.photos/seed/${user.username}/150/150`} alt={user.username} className=' w-full h-full object-cover'/>
                            </div>
                            <div>
                                <p className='font-semibold text-xs'>{user.username}</p>
                                <p className='text-gray-500 text-[11px] truncate w-32'>{user.subtitles}</p>
                            </div>
                            <button className='text-blue-500 font-semibold text-xs hover:text-blue-900 transition' >Follow</button>
                        </div>
                    </div>     
                ))}
            </div>
            {/*4.Footer Links */}
            <div className="text-[#c7c7c7] text-xs">
                <p className='mb-4 hover:underline cursor-pointer'>
                    About . Help . Press . API . Jobs . Privacy . Terms . Locations . Language
                </p>
                <p>
                    2026 INSTAGRAM FROM META
                </p>
            </div>

        </div>
    )
}

export default RightSidebar