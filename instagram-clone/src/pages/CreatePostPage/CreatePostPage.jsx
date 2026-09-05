import React, { useContext, useState } from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

// function CreatePostPage() {
//     // we use state to hold the text the user types into the form
//     const [imageUrl, setImageUrl] = useState('')
//     const [caption, setCaption] = useState('')
//     //This function runs when the user clicks "Share"
//     const handleShare = async (event) => {
//         event.preventDefault();//prevents the page from refreshing

//         try {
//             //we send the data to the API we just built!
//             const response = await fetch('http://localhost:5000/api/posts/add', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     username: "velmurugan", //we will hardcode your name until we build a login page!
//                     imageUrl: imageUrl,
//                     caption: caption
//                 })
//             })

//             if (response.ok) {
//                 alert('Post shared Successfully');
//                 setImageUrl("");//Clear the from
//                 setCaption("");
//             }

//         } catch (error) {
//             alert('Error Sharing post!');
//             console.log(error);
//         }

//     }

//     return (
//         <div className='flex bg-gray-50 min-h-screen'>
//             <Sidebar />
//             <div className="ml-64 flex-grow flex items-center justify-center">
//                 <div className='bg-white p-8 rounded-xl border border-gray-300 w-full max-w-md shadow-sm'>
//                     <h2 className='text-2xl font-bold mb-6 txt-center text-gray-800'>Create New Post</h2>
//                     <form onSubmit={handleShare} className='flex flex-col gap-4'>
//                         <div>
//                             <label className='block text-sm font-semibold text-gray-600 mb-1'>Image URL</label>
//                             <input type="text" placeholder='Paste an image link here...' className='w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-500' value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} required />
//                         </div>
//                         <div>
//                              <label className='block text-sm font-semibold text-gray-600 mb-1'>Caption</label>
//                              <textarea placeholder='Write a caption...' className='w-full border border-gray-300 p-2 rounded h-24 resize-none focus:outline-none focus:border-gray-500' value={caption} onChange={(event)=> setCaption(event.target.value)} required/>
//                         </div>
//                         <button type='submit' className='bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition mt-2'>
//                             Share
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }


function CreatePostPage() {
    const [caption, setCaption] = useState('')
    const [imageFile, setImagFilel] = useState(null) //stores the actual file
    const [isUploading, setIsUploading] = useState(false)// showes a loading state
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const handlPostSubmit = async (event) => {
        event.preventDefault();//prevents the page from refreshing
        setIsUploading(true); //Changes button text to "Uploding..."

        try {
            //1. upload the image file to your backend (/api/upload)
            const formData = new FormData();
            formData.append('image', imageFile)
//old local server to fetch this
// const uploadRes = await fetch('http://localhost:5000/api/upload', {
            const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
                method: 'POST',
                body: formData, //no 'Content-Type ' header needed for files
            })
            const uploadData = await uploadRes.json()

            if (!uploadRes.ok) {
                setIsUploading(false)
                return alert("Image upload failed!")
            }

            //.2 create the post using  the secure cloudinary URL we just recived
            // const postRes = await fetch('http://localhost/api/posts',{
            const postRes = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: user.username,
                    imageUrl: uploadData.imageUrl, //the live cloudunary link
                    caption: caption
                })
            })

            if (postRes.ok) {
                alert("Post created successfully")
                navigate('/'); //instantly teleport back to the home feed
            }

        } catch (error) {
            console.log('Error Creating post!:', error);

        } finally {
            setIsUploading(false); //reset loading state
        }

    }

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className='bg-white p-8 border border-gray-300 rounded-sm w-96'>
            <h2 className='text-2xl font-serif mb-6 text-center'>Create new post</h2>
            <form onSubmit={handlPostSubmit} className='flex flex-col gap-4'>
                <input type="file" accept='image/*' onChange={(e)=> setImagFilel(e.target.files[0])} className='border border-gray-300 p-2 rounded text-sm bg-gray-50 cursor-pointer'  required />
                 <textarea placeholder='Write a caption' rows="3" value={caption} onChange={(e)=>setCaption(e.target.value)} className='border border-gray-300 p-2 focus:outline-none focus:border-gray-400 text-sm resize-none' required></textarea>
                <button type='submit' disabled={isUploading} className={`text-white p-2 rounded-lg font-semibold transition ${isUploading ? 'bg-blue-300':'bg-blue-500 hover:bg-blue-600'}`}>
                    {isUploading?"uploading...":'Share'}
                    </button>      
            </form>

        </div>

        </div>
        

    )
}

export default CreatePostPage