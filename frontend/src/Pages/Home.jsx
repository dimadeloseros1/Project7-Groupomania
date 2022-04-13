import React from "react";
import { useState } from "react";
import axios from "axios";
import Feed from "../components/Feed"
import "../styles/Topbar.css"
import TopBar from "../components/Topbar";
import RightBar from "../components/RightBar"
import "../styles/Home.css"
export default function PostAComment() {
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <Feed />
        <RightBar />
      </div>
      
    </>
    
    
  )
}

