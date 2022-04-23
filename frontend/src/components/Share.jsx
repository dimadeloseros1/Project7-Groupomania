import "../styles/Share.css"
import { PermMedia } from "@mui/icons-material"
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { AuthContext,PostsContext } from "../App";


export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext)
    const inputRef = useRef();
    const [file, setFile] = useState(null);
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
            //         await axios.post("/upload", data);
            //     } catch (error) {
            //         console.log(error)
            //     }
            // }
           
        }
    return (
        <div className="share">
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
                            <span className="shareOptionText">Photo or video</span>
                            <input style={{display: "none"}} type="file" id="file" accept=".png,.jpeg,.jpg,.gif"/>
                        </label>
                    </div>
                    <button onClick={sendPost} className="shareButton" type="submit">Share</button>
                </div>
            </div>
        </div>
    )
}