import "../styles/Share.css"
import { PermMedia } from "@mui/icons-material"
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext,PostsContext } from "../App";
import { useParams } from "react-router-dom";


export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext)
    const inputRef = useRef();
    const [image, setImage] = useState(null);
    const [authToken,setAuthtoken] = useContext(AuthContext)
    const [isnewpost,setisnewpost] = useContext(PostsContext)
    const [userInfo, setUserInfo] = useState({
        file:[],
    })
    useEffect(() => {
        inputRef.current.value = ""
    })
    const sendPost = async (e) =>{
        e.preventDefault()
        console.log('File is working ')
        let file = document.querySelector("#file")
        
        console.log(file.files[0]);
        const formData = new FormData();
        formData.append("file", file.files[0]);
        formData.append("data", inputRef.current.value)
        await axios.post('http://localhost:3001/api/upload/',formData,
        {
            headers:{
                authorization:authToken,
                // 'Content-Type': 'multipart/form-data'
                
            },
            

        })
            console.log(isnewpost)
            setisnewpost(isnewpost+1)

            // const handleInputChange = (event) => {
            //     setUserInfo({
            //         ...userInfo,
            //         file:event.target.files[0],
            //     })
            // }

            

            // const submitHandler = (e) => {
            //     console.log(submitHandler)
            //     e.prventDefault()
            //     const newPost = {
            //         userId: user.id,
            //         inputRef: inputRef.current.value,
            //     }
            // }
            // if(file){
            //     const data = new FormData();
            //     const fileName = Date.now() + file.name;
            //     data.append("file", file);
            //     data.append("name", fileName);
            //     newPost.img = fileName;
            //     console.log(newPost)
            //     try {
            //         await axios.post("/upload", data);
            //     } catch (error) {
            //         console.log(error)
            //     }
            // }
    
            // const handleInput = async () => {
            //         console.log("Handle Uploaded")
            //        await axios.post("http://localhost:3001/api/upload", {
                    
            //        });
    // }
               
        }
    
        // const getFileInfo = (e) => {
        //     setImage(formData);
        // }
    
    return (
    
        <form >
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/Frodo.jpeg" alt="frodo-pic" />
                    <input ref={inputRef}
                        placeholder="What's in your mind?"
                        className="shareInput"
                    />
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <label  className="shareOption">
                            <PermMedia htmlColor="orange" className="shareIcon" />
                            <span className="shareOptionText">Photo or video</span>
                            <input style={{display: "none"}}  type="file" id="file" name="file" accept=".png,.jpeg,.jpg,.gif"/>
                        </label>
                    </div>
                    <button onClick={sendPost} className="shareButton">Share</button>          
                </div>
            </div>
        </form>
    )
}