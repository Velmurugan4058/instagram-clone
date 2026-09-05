import React from 'react'

function Stories() {
    // Arrray of  fake users for our stories
    const storyUsers = [
        { id: 1, userName: "Master_vel06" },
        { id: 2, userName: "mamitha baiju" },
        { id: 3, userName: "robertdowneyjr" },
        { id: 4, userName: "ActorVijay" },
        { id: 5, userName: "aparna das" },
        { id: 6, userName: "ashika ranganath" },
        { id: 7, userName: "surya sivakumar" },
        { id: 8, userName: "unkwon" },
    ]
    return (
        <div className='flex gap-4 p-4 bg-white border border-gray-200 rounded-lg max-w-[470px] w-full mb-8 overflow-x-auto no-scrollbar'>
            {storyUsers.map((user) => (
                <div key={user.id} className='flex flex-col items-center cursor-pointer min-w-[70px]'>
                    {/*1.The Gradient story ring */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px] mb-1">
                        {/*2. the inner white border & picture placeholder */}
                        <div className='bg-white w-full h-full rounded-full border-2 border-white flex items-center justify-center'>
                          <img src={`https://picsum.photos/seed/${user.userName}/150/150`} alt={user.userName} className='w-full h-full rounded-full object-cover'/>
                        </div>
                    </div>
                    {/*3. The UserName (Truncated if too long) */}
                    <span className='text-xs text-gray-700 truncate w-16 text-center'>{user.userName}</span>
                </div>
            ))}

        </div>
    )

}
export default Stories