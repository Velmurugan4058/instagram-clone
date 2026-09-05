import React from 'react'

function MessagePage() {
    return (
        <div className="flex h-screen w-full bg-white">
            <div className="w-1/3 border-r border-gray-300 flex flex-col">
                <div className='p-5 border-b border-gray-300 font-bold text-xl'>
                    Messages
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {/* Dummy contact (we will map real users here later) */}
                    <div className="flex items-center gap-3 mb-4 cursor=pointer hover:bg-gray-50 p-2 rounded-lg transition ">
                        <div className="w-12 h-12 bg-gray-200 rounded-full border border-gray-300"></div>
                        <div>
                            <p className='font-semibold text-sm'>Velmaster</p>
                            <p className='text-sm text=gray-500'>Active now</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*right colum :Active chat window */}
            <div className='text-center p-8'>
                <div className="w-24 h-24 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg aria-label='Direct' className='w-12 h-12' fill='currentColor' viewBox='0 0 24 24' >
                        <path d='M22 3L2 11l7 3 3 7 10-18zm-8.5 7.5L5.7 9l13.5-5-8.5 7.5z'></path>
                    </svg>
                </div>
                <h2 className='text-2xl font-bold text-black mb-2'>Your  Messages</h2>
                <p className='text-sm'>Send private photos and messages to a friend.</p>
                <button className='mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600'>Send Message</button>
            </div>




        </div>


    )
}

export default MessagePage