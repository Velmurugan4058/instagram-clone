import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'


function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    //useing local storage for log in
    const {login} = useContext(AuthContext)
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json();

            if (response.ok) {
                login(data.user);
                alert("Login Successfully! Welcome Back.")
                window.location.href = "/";//instantly redirects to homepage

            }
            else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Login error:", error)
        }

    }
    const goSignup = ()=>{
        window.location.href = "/signup"
    }
    return (
        <div className='flex h-screen items-center justify-center bg-gray-50'>
            <div className='bg-white p-8 border border-gray-300 rounded-sm w-96 flex flex-col items-center'>
                <h1 className='text-4xl font-serif mb-6 cursor-default'>Instagram</h1>

                <form onSubmit={handleLogin} className='flex flex-col w-full gap-3'>
                    <input type="email" placeholder='Email' required className='border border-gray-300 p-2 rounded-sm bg-gray-50 text-sm focus:outline-none focus:border-gray-400' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password' required className='border border-gray-300 p-2 rounded-sm bg-gray-50 text-sm focus:outline-none focus:border-gray-400' onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className='bg-blue-500 text-white p-2 rounded-lg font-semibold mt-2 hover:bg-blue-600 transition'>Login</button>

                </form>
                <button onClick={goSignup} className='bg-blue-500 w-full text-white p-2 rounded-lg font-semibold mt-2 hover:bg-blue-600 transition'>Signup</button>
            </div>
        </div>
    )
}

export default LoginPage