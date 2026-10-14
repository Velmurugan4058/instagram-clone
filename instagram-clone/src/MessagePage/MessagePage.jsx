import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { io } from 'socket.io-client'

function MessagePage() {
    const { user } = useContext(AuthContext) //get logged-in user
    const [users, setUsers] = useState([]) //list of contacts for the side bar
    const [activeChat, setActiveChat] = useState(null) //the person you are currently chatting with 
    const [message, setMessage] = useState([])//chat history
    const [newMessage, setNewMessage] = useState("") //The message being typed
    const socket = useRef(null)//reference to the real time connection
    const messagesEndRef = useRef(null) //to auto-scroll to the newest message

    //1.instialize socket.io connection
    useEffect(() => {
        socket.current = io(`${import.meta.env.VITE_API_URL}`);// connect to your node.js server
        //listen for incomming message belongs to the current open chat, display it
        socket.current.on("receive_message", (data) => {
            console.log("frontend received message:",data)
            const isSender = data.senderId === activeChat?._id || data.senderId === activeChat?.id;
            const isReceiver = data.receiverId === activeChat?._id || data.receiverId === activeChat?.id;
            
            if (activeChat && (data.senderId === activeChat._id || data.receiverId === activeChat._id)) {
                setMessage((prev) => {
                const isDuplicate = prev.some((msg)=> msg._id === data._id);
                if(isDuplicate){
                    return prev;
              
              }
              return[...prev,data]
            })
            }
        });


        return () => {
             socket.current.off("receive_message")
            socket.current.disconnect();//clean up on page exit
           

        }
    }, [activeChat,user])
    //2.fetch all users for the sidebar
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`)
                const data = await response.json()
                //remove the logged-in user from the list (you can't chat with yourself)
                if (Array.isArray(data)) {
                   
                    setUsers(data)
                } else {
                    console.error("Backend did not return an array of users:", data)
                }

            } catch (error) {
                console.error("error fetching users:", error)
            }
        }; fetchUsers()
    }, [user])
    //3.fetch chat history when a contact is clicked
    useEffect(() => {
        if (activeChat && user) {
            const fetchMessage = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/${user._id}/${activeChat._id}`)
                    const data = await response.json()
                    if (Array.isArray(data)) {
                        setMessage(data)
                    } else {
                        setMessage([])
                    }


                } catch (error) {
                    console.error("Error  Fetching message:", error)
                }
            }; fetchMessage()
        }
    }, [activeChat, user])
    //4.auto-scroll to the bottom of thre chat window
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

    }, [message])
    //5.send a new message 
    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!newMessage.trim() || !activeChat) return;
        const messageData = {
            senderId: user._id || user?.id,
            receiverId: activeChat._id,
            text: newMessage,
        };

        try {
            //save to mongoDb via api
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messageData)
            })
            
                const savedMessage = await response.json()
                //send instantly via scoket.io
                socket.current.emit("send_message", savedMessage)
                //update local screen immediately 
                setMessage((prev) => [...prev, savedMessage])
                setNewMessage("") //clear input
                socket.current.emit("send_message",savedMessage)
            
        } catch (error) {
            console.error("Error sending message:", error)
        }
    }
    return (
        <div className="flex h-screen w-full bg-white">
            <div className="w-1/3 border-r border-gray-300 flex flex-col">
                <div className='p-5 border-b border-gray-300 font-bold text-xl'>
                    Messages
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {users.filter((u)=> u._id !== user?._id && u.username !== user?.username).map((contact) => (
                        <div key={contact._id} onClick={() => setActiveChat(contact)} className={`flex items-center gap-3 mb-4 cursor-pointer p-2 rounded-lg transition-colors ${activeChat?._id === contact._id ? "bg-gray-100" : "hover:bg-gray-50"}`}>

                            <div className='w-12 h-12 bg-gray-200 rounded-full border border-gray-300 flex-shrink-0 flex items-center justify-center font-bold text-gray-500 uppercase'>
                                {contact.username.charAt(0)}
                            </div>
                            <div className='truncate w-full'>
                                <p className="font-semibold text-sm truncate">{contact.username}</p>
                                <p className="text-xs text-gray-500">Tap to Chat</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/*right colum :Active chat window */}
            <div className='w-2/3 flex flex-col relative h-full'>
                {!activeChat ? (
                    //default state (no chat selected)
                    <div className='flex-1 flex items-center justify-center'>
                        <div className='text-center p-8'>
                            <div className="w-24 h-24 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg aria-label='Direct' className='w-12 h-12' fill='currentColor' viewBox='0 0 24 24' >
                                    <path d='M22 3L2 11l7 3 3 7 10-18zm-8.5 7.5L5.7 9l13.5-5-8.5 7.5z'></path>
                                </svg>
                            </div>
                            <h2 className='text-2xl font-bold text-black mb-2'>Your  Messages</h2>
                            <p className='text-sm'>Send private photos and messages to a friend.</p>
                        </div>
                    </div>

                ) : (
                    //Active chat header\
                    <>
                        {/* chat header */}
                        <div className='flex items-center gap-3 p-4 border-b border-gray-300'>
                            <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 uppercase'>
                                {activeChat.username.charAt(0)}
                            </div>
                            <h3 className='font-bold text-lg'>{activeChat.username}</h3>
                        </div>
                        {/*chat history arae */}
                        <div className="flex-1 overflow-y-auto p-4 flex-col gap-3 bg-gray-50 pb-20">
                            {message.map((msg, index) => {
                                const isMe = msg.senderId === (user.id || user?._id);
                                return (
                                    <div key={msg._id||index} style={{display:"flex", justifyContent:isMe ? "flex-end" : "flex-start",
                                        marginBottom:"10px"
                                    }}>

                                        <div style={{backgroundColor: isMe ? "#3797f0" : "#efefef",
                                            color:isMe? "white" : "black",
                                            padding:"10px 15px",
                                             borderRadius: isMe ? "20px 20px 5px 20px":"20px 20px 20px 5px",
                                             maxWidth:"60%",
                                             wordBreak:"break-word"}}>
                                            {msg.text}
                                        </div>
                                    </div>
                                )
                            })}
                            <div ref={messagesEndRef}></div>{/*invisible auto-scrool */}
                        </div>
                        {/** */}
                        <form onSubmit={handleSendMessage} className='absolute bottom-0 e-full p-4 bg-white border-t border-gray-300 flex items-center gap-2'>
                            <input type="text" placeholder='Message...' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className='flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-gray-500 text-sm ' />
                            <button type='submit' disabled={!newMessage.trim()} className='text-blue-500 font-semibold px-4 hover:text-blue-700 disabled:opacity-50'>Send</button>
                        </form>

                    </>

                )}
            </div>
        </div>
    )
}
export default MessagePage