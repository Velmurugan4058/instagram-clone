import React from 'react'
import SearchIcon from '@mui/icons-material/Search'

function SearchPage() {
  return (
    <div className='w-screen  h-screen bg-gray-300 '>
      <div className='flex flex-col items-center '>
        <form className='m-0 p-0 '>
          <input type="search" placeholder='Search with Meta AI' className='h-10 w-60 my-4 m bg-white-500 rounded-xs text-md text-center' /> <span className='h-10 w-10'><SearchIcon /></span>
        </form>
      </div>

      <div className='mx-4 grid grid-flow-col grid-rows-[200px_minmax(200px,1fr)_200px]  gap-4 text-center'>
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+1}'} alt="sugImg" className='h-full w-full object-fit' /></div>
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+5}'} alt="sugImg" className='h-full w-full object-fit' /></div>
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+9}'} alt="sugImg" className='h-full w-full object-fit' /></div> 
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+15}'} alt="sugImg" className='h-full w-full object-fit' /></div>
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+2}'} alt="sugImg" className='h-full w-full object-fit' /></div>  
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+6}'} alt="sugImg" className='h-full w-full object-fit' /></div>  
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+10}'} alt="sugImg" className='h-full w-full object-fit' /></div> 
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+14}'} alt="sugImg" className='h-full w-full object-fit' /></div>
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+3}'} alt="sugImg" className='h-full w-full object-fit' /></div>  
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+7}'} alt="sugImg" className='h-full w-full object-fit' /></div>  
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+11}'} alt="sugImg" className='h-full w-full object-fit' /></div> 
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+13}'} alt="sugImg" className='h-full w-full object-fit' /></div>
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+4}'} alt="sugImg" className='h-full w-full object-fit' /></div>  
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+8}'} alt="sugImg" className='h-full w-full object-fit' /></div>  
        <div className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={'https://picsum.photos/200/200?random=${postNumber+12}'} alt="sugImg" className='h-full w-full object-fit' /></div>
      </div>
    </div>
  )
}

export default SearchPage