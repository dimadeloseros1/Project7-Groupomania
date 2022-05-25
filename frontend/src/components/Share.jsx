import "../styles/Share.css"
import { PermMedia } from "@mui/icons-material"
import { useContext, useRef, useState } from "react";
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
    const sendPost = async () =>{
        await axios.post('http://localhost:3001/api/post/',{data:{
            content:inputRef.current.value,
            },},
        {
            headers:{
                authorization:authToken
                },


        })
            console.log(isnewpost)
            setisnewpost(isnewpost+1)

            const handleInputChange = (event) => {
                setUserInfo({
                    ...userInfo,
                    file:event.target.files[0],
                })
            }

            

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
            //         await axios.post("api/upload", data);
            //     } catch (error) {
            //         console.log(error)
            //     }
            // }
            
        

        
    }
        const handleInput = async () => {
                console.log("Handle Uploaded")
               await axios.post("http://localhost:3001/api/upload", {
                headers: { 'Content-Type': 'multipart/form-data'}
               });
               
        }
    
        const getFileInfo = (e) => {
            console.log('File is working ')
            console.log(e.target.files[0]);
            const formData = new FormData();
            formData.append("public/images", e.target.files[0], e.target.files[0].name);
            setImage(formData);
        }
    
    return (
    
        <form method="POST" action="/upload" encType="multipart/form-data">
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
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="orange" className="shareIcon" />
                            <span className="shareOptionText" onClick={handleInput}>Photo or video</span>
                        </label>
                        <input style={{display: "none"}}  type="file" id="file" name="file" accept=".png,.jpeg,.jpg,.gif" onClick={getFileInfo}/>
                    </div>
                    <button onClick={sendPost} className="shareButton" type="submit">Share</button>
                    <input type="submit" value="Upload" />
                </div>
            </div>
        </form>
    )
}