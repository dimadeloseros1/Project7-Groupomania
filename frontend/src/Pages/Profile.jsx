import "../styles/Profile.css"
import TopBar from "../components/Topbar";
import RightBar from "../components/RightBar";
import Feed from "../components/Feed";
import { useContext, useState } from "react";
import axios, { Axios } from "axios";
import { AuthContext } from "../App";
import { useParams } from "react-router-dom";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [username, setUsername] = useState('');
    const [pseudo, setPseudo] = useState('');   
    const [authToken, setAuthtoken] = useContext(AuthContext)
    const {user} = useContext(AuthContext)

    
    const handleUpdateProfile = () => {
        const data = {}
            if(pseudo.length > 0) {
                data.pseudo = pseudo
            }        

            if (username.length > 0) {
                data.username = username
            }

            if(Object.keys(data).length > 0) {
                axios.put(
                    URL = `http://localhost:3001/api/post/`, data)
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err))
            }
    }

    

    const deleteProfile = () => {
        console.log(authToken)
        let id = JSON.parse(authToken).id
        if (window.confirm("Are you sure that you want to delete your profile?")) {
            axios.delete(`http://localhost:3001/api/users/${id}`,{
                headers: {authToken: localStorage.getItem("authToken")}
            })
            .then(() => window.localStorage.clear())
            window.location = "/"
        }
    }
    
    
    return (
        <>
        <TopBar />
        <div className="profile">
            <form className="profileRight" onSubmit={handleUpdateProfile} id="update--profile">
                <label htmlFor="username">Username</label>
                <br/>
                <input type="text"
                       name="username"
                       id="username"
                       onChange={(e) => setUsername(e.target.value)}
                       value={username}
                />
                <input type="submit" value="Modify" />
                <button type="button" 
                        className="delete--button"
                        value="delete"
                        
                        onClick={() => {deleteProfile()}}>Delete Profile</button>
                
                <RightBar />
            </form>
        </div>
      
    </>
    )
}