import React, { useState,useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import { createContext } from "react";
export const AuthContext = createContext();
export const PostsContext = createContext();


export default function Rendering() {
  const [authToken,setAuthtoken] = useState('');
  const [newpost,setNewpost] = useState(1);
  useEffect(()=>{
    console.log('renders')
    try{
        setAuthtoken(localStorage.getItem("user"))
    }
    catch(err){
      console.log(err)
      
      
      
        alert('not signed in')
        localStorage.removeItem('user')
      
    }
  },[setAuthtoken])
  
  return (
  <PostsContext.Provider value={[newpost,setNewpost]}>
    <AuthContext.Provider value={[authToken,setAuthtoken]}>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
    </AuthContext.Provider>
  </PostsContext.Provider>
    
  )
}