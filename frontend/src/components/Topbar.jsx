import React from "react";
import "../styles/Topbar.css"
import { Person, Notifications } from "@mui/icons-material"
import {Link} from "react-router-dom"
import { Button } from "@mui/material";
import {AuthContext} from '../App'
import { useContext } from "react";
function TopBar() { 
    const [authToken,setAuthtoken] = useContext(AuthContext)

    const logout = () =>{
      setAuthtoken('')
      localStorage.removeItem('user')
    }
    return (
      <section>
        <div className="topBarContainer">
            <div className="topbarLeft">
                <Link to="/Home" style={{textDecoration:"none", color:"white", }}>
                    <h2 className="groupoManiaLogo">Groupomania</h2>
                </Link>
            </div>
            <div className="topbarRight">
              <div className="topBarIcon">
                  <div className="topBarIconItems">
                      <Notifications className="notifications--logo"/>
                      <span className="topBarIconBadge">1</span>
                  </div>
              </div>
              <div className="topBarLinks">
                    <Person className="person--logo"/>
                    <span className="topBarIconBadge">1</span>
                    <Link to='/' onClick={logout} style={{textDecoration:"none", color:"white"}} className="logout--button">Logout</Link>
                    <Link to="/Profile" style={{textDecoration:"none", color:"white"}}>
                    <div className="topBarLink">Profile</div>
                  </Link>
              </div>
                
            </div>
        </div>
        <div>
          
        </div>
        
        
      </section>
    )
  }
  
  export default TopBar