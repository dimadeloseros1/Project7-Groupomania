import React from "react"
import { Route, Routes } from "react-router-dom"

import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
export default function Rendering() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
    
  )
}