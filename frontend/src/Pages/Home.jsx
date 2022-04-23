import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import Feed from "../components/Feed"
import "../styles/Topbar.css"
import TopBar from "../components/Topbar";
import RightBar from "../components/RightBar"
import "../styles/Home.css"
import { AuthContext } from "../App";

export default function PostAComment() {
  const [authToken,setAuthtoken] = useContext(AuthContext)


  if(authToken)
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <Feed />
        <RightBar />
      </div>
      
    </>    
  )
  else
    return(
    <div>
      not signed in
    </div>
    )
  }

