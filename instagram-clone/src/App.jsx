import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import Profilepage from './pages/ProfilePage/Profilepage'
import CreatePostPage from './pages/CreatePostPage/CreatePostPage'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import MessagePage from './MessagePage/MessagePage'
import SearchPage from './pages/SearchPage/SearchPage'
import NotificationPage from './pages/NotificationPage/NotificationPage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import ReelsPage from './pages/ReelsPage/ReelsPage'

function App(){
   return(
    <AuthProvider>
        <Routes>
      {/* <Route path='/' element={<HomePage/>}></Route> */}
      {/* after add protected route */}
      <Route path='/' element={<PrivateRoute><HomePage/></PrivateRoute>}></Route>
      <Route path='/auth' element={<AuthPage/>}></Route>
      <Route path='/profile' element={<Profilepage/>}></Route>
      <Route path='/profile/:userId' element={<Profilepage/>}></Route>
      <Route path='/create' element={<CreatePostPage/>}></Route>
      <Route path='/message' element={<MessagePage/>}></Route>
      <Route path='/signup' element={<SignupPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/search' element={<SearchPage/>}></Route>
       <Route path='/notifications' element={<NotificationPage/>}></Route>
        <Route path='/explore' element={<ExplorePage/>}></Route>
        <Route path='/reels'  element={<ReelsPage/>}></Route>

    </Routes>
    </AuthProvider>
    
  

    


   
   )

}

export default App
