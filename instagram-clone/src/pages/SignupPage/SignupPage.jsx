import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignupPage() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            })

            const data = await response.json();

            if (response.ok) {
                alert("Account created Successfully!")
                // we will build the login page next
            }
            else{
                alert(data.message);
            }
        }
        catch(error){
            console.log("Signup error:",error)
        }

    }

    return (
        <div className='flex h-screen items-center justify-center bg-gray-50'>
            <div className='bg-white p-8 border border-gray-300 rounded-sm w-96 flex flex-col items-center'>
                <h1 className='text-4xl font-serif mb-6 cursor-default'>Instagram</h1>
                <p className='text-gray-500 font-semibold text-center mb-6'>Sign up to see photos and Videos from your Friends.</p>

                <form className='flex flex-col w-full gap-3' onSubmit={handleSignup}>
                    <input type="text" placeholder='Username' required className='border border-gray-300 p-2 rounded-sm bg-gray-50 text-sm focus:outline-none focus:border-gray-400' onChange={(e)=>setUsername(e.target.value)} />
                    <input type="email" placeholder='Email' required className='border border-gray-300 p-2 rounded-sm bg-gray-50 text-sm focus:outline-none focus:border-gray-400' onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder='Password' required className='border border-gray-300 p-2 rounded-sm bg-gray-50 text-sm focus:outline-none focus:border-gray-400' onChange={(e)=>setPassword(e.target.value)} />
                    
                    <button type="submit" className='bg-blue-500 text-white p-2 rounded-lg font-semibold mt-2 hover:bg-blue-600 transition'>Signup</button>
                <button type='button' className='bg-blue-500 text-white p-2 rounded-lg font-semibold mt-2 hover:bg-blue-600 transition' onClick={()=>navigate('/login')} >Login</button>
                </form>

            </div></div>

    )
}

export default SignupPage