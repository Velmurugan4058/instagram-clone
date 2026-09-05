import React, { useEffect, useState,createContext } from 'react'
//1,create the context
export const AuthContext = createContext();

//2.Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(()=>{
        const savedUser = localStorage.getItem("instagram_user")
        return savedUser ? JSON.parse(savedUser):null
    })

    //when the app loads, check if a user is already saved in local storage
    // useEffect(() => {
    //     const savedUser = localStorage.getItem("instagram_user")
    //     if (savedUser) {
    //         setUser(JSON.parse(savedUser))
    //     }
    // }, [])
    //function to run wgen they login
    const login = (userData) => {
        localStorage.setItem("instagram_user", JSON.stringify(userData));
        setUser(userData)
    }


    //function to run wgen they logout
    const logout = () => {
        localStorage.removeItem("instagram_user")
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
    )

}



