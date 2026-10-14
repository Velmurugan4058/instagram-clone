import React, { useEffect, useState ,useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


function NotificationPage() {
    const { user } = useContext(AuthContext)
      const [users, setUsers] = useState([]) 
    const [notifications,setNotifications] = useState([])
    useEffect(()=>{
        const fetchNotifications = async ()=>{
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/${user._id}`);
                const data = await response.json();
               if(Array.isArray(data)){
                setNotifications(data);
               }else{
                setNotifications([])
               }
                

            }catch(error){
                console.error("Error fetching notifications",error)
            }
        }
        if(user._id) fetchNotifications();
    },[user])

    //helper function to format time (e.g., "2h","1w")
    const getTimeAgo = (data)=>{
      if(!data) return "just now";
        const seconds = Math.floor((new Date()- new Date(date))/1000);
        if(seconds<3600) return `${Math.floor(seconds/60)}m`;
       if(seconds<86400) return `${Math.floor(seconds/3600)}h`;
       return`${Math.floor(seconds/86400)}d`

    }
    return (
        <div style={{ backgroundColor: "#000", color: "#fff", padding: "20px", minHeight: "100vh" }}>
      <h2 style={{ paddingBottom: "20px" }}>Notifications</h2>

      {notifications.length === 0 ? ( 
        <div style={{textAlign:"center",color:"gray",marginTop:"50px"}}>
          <h3>No notifications yet.</h3>
          <p>When someone like your post or follows you, it will show up here.</p>
        </div>
      ):(
        notifications.map((notif) => (
        <div key={notif._id} style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          
          {/* Profile Picture Placeholder */}
          <div style={{
            width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#333",
            backgroundImage: `url(${notif.senderId?.profilePic || ''})`, backgroundSize: "cover"
          }} />

          {/* Dynamic Notification Text */}
          <div style={{ flex: 1, marginLeft: "15px", fontSize: "14px" }}>
            <span style={{ fontWeight: "bold" }}>{notif.senderId?.username} </span>
            {notif.type === 'like' && "liked your post."}
            {notif.type === 'comment' && "commented on your post."}
            {notif.type === 'follow' && "started following you."}
            <span style={{ color: "gray", marginLeft: "5px" }}>{getTimeAgo(notif.createdAt)}</span>
          </div>

          {/* Dynamic Action Button */}
          {notif.type === 'follow' && (
            <button style={{ 
              backgroundColor: "#0095f6", color: "#fff", border: "none", 
              padding: "7px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" 
            }}>
              Follow
            </button>
          )}
        </div>
      ))
      )}
      
      
    </div>
    )
}

export default NotificationPage