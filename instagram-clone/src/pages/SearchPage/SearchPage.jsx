import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

function SearchPage() {
  //1. create a state holding an intial array of 15 numbers (1to15)
  const [images,setImages] = useState(Array.from({length:15},(_,i)=>i+1));
  const [loading,setLoading] =useState(false)

  //2. Function to load more images when called
  const fetchMoreImages = ()=>{
    setLoading(true);
    //simulating a database fetch delay of 1 second
    setTimeout(()=>{
      setImages((prevImages)=>{
        //creating new 15 numbers strating from where the last array ended
        const newImages = Array.from({length:15},(_,i)=> prevImages.length+i+1);
    return[...prevImages, ...newImages];//combaine old and new arrays
    })
    setLoading(false)
      },1000)
  }

  //3. listen to the browser's scroll event
  useEffect(()=>{
    const handleScroll = ()=>{
      //if the user scrolls to the very bottom of the page, fetch more
      if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
        fetchMoreImages();
      }
    }
    window.addEventListener('scroll',handleScroll);
    return()=>window.removeEventListener('scroll',handleScroll);
},[])
  return (
    <div className='w-screen  min-h-screen bg-gray-300 overflow-x-hidden'>
      {/* search bar section */}
      <div className='flex flex-col items-center py-4'>
        <form className='m-0 p-0 flex items-center bg-white rounded-xs '>
          <input type="search" placeholder='Search with Meta AI' className='h-10 w-60 my-4 px-2 outline-none' /> <span className='h-10 w-10 flex justify-center'><SearchIcon /></span>
        </form>
      </div>
      {/* grid contaimer (changed to grid-cols-3 for vertical scrolling) */}
      <div className="mx-4 grid grid-cols-5 gap-2 auto-rows-[200px]">
      {/* 4.use .map() to loop through the state array instead of copying divs */}
      {images.map((imgId,index)=>(
        <div key={index} className='w-full h-full bg-white border border-black rounded-md overflow-hidden'><img src={`https://picsum.photos/200/200?random=${imgId}`} alt="subimg"  className='w-full h-full object-cover'/></div>
      ))}
      </div>
      {/* loading spinner indicator */}
      {loading && (
        <div className='text-center py-4 font-bold text-gray-700'>
          Loading more posts...
        </div>
      )}

      {/* <div className='mx-4 grid grid-flow-col grid-rows-[200px_minmax(200px,1fr)_200px]  gap-4 text-center'>
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
      </div> */}
    </div>
  )
}

export default SearchPage