import "../styles/Post.css"
import {  Add, MoreVert } from "@mui/icons-material" 
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { format } from "timeago.js"
import { Link, useParams } from "react-router-dom"
import { AuthContext } from "../App"


export default function Post({post}) {
    const [like, setLike] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    let { id } = useParams();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const backend = process.env.BACKEND_APP_PUBLIC_FOLDER
    const [authToken,setAuthtoken] = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

    const deleteNotification = () => {
        setIsOpen(!isOpen)
    }
    
    
    
    useEffect(() => {
        console.log(isLiked)  
        let token = JSON.parse(authToken) 
        const fetchUser = async () => {
        const res = await axios.get(`/users/${post.UserId}`,{
            headers:{
                authorization:authToken
            },
        });
        
        setUser(res.data)
    }
    fetchUser()
    },[post.UserId])
    
    const deletePost = (id, e) => {
        
        if (window.confirm('Are you sure you want to delete this post?')) {
            axios.delete(`http://localhost:3001/api/post/${id}`, {
                headers:{
                    authorization:authToken
                },
         })
            
        }
           };


    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }
    let loggedInUserId = JSON.parse(authToken).id
    let loggedInUserPostView = JSON.parse(authToken).postView
    console.log(loggedInUserPostView)
    console.log(authToken)
    return (
        <div className="post unseen">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to ={`Profile/${user.username}`}>
                        <img className="postProfileImg" src={user.profilePicture || "assets/Harry.jpeg"} alt="" />
                        </Link>
                        <span className="postUserName">{user.username}</span>        
                        <span className="postUserDate">{format(post.createdAt)}</span>
                    </div>
                    <div id="authId">
                        <ul className="unread--post">
                            <li>PostId: {post.id}</li> 
                            <li>LoggedInUser: {loggedInUserId}</li>
                            <li>lastSeenPostId: {loggedInUserPostView}</li> 
                            <li>postUserId: {user.id}</li>
                        </ul>
                    </div> 
                    { ((user.id !== loggedInUserId) && (post.id > loggedInUserPostView)) && 
                    <div className={`${isOpen ? 'postTopRight--not__active' : 'postTopRight'}`}>
                        {/* <span className="delete--notification" onClick={deleteNotification}>delete</span> */}
                        <FiberNewIcon className="iconss" sx={{ fontSize: '50px'}} />
                    </div> 
                    }               
                </div>
                <div className="postCenter">
                    <span className="postText">{post.content}</span>
                    <img className="postImg" src={"http://localhost:3001/images/" + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
                        <img className="heartIcon" src="assets/valentine-heart.jpg" onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                        <button className="delete--button" onClick={() => {deletePost(post.id)}}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}