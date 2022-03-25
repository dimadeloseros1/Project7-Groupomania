import React from "react"
import { Route, Routes } from "react-router-dom"

import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
export default function Rendering() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
    
  )
}