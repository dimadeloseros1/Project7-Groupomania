import "../styles/Post.css"
import {  MoreVert } from "@mui/icons-material" 
import { useState, useEffect } from "react"
import axios from "axios"


export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        const fetchUser = async () => {
        const res = await axios.get(`user/${post.uuidUser}`);
        setUser(res.data)
    }
    fetchUser()
    },[])

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postProfileImg" src={user.profilePicture || "assets/Harry.jpeg"} alt="" />
                        <span className="postUserName">{user.username}</span>
                        <span className="postUserDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF+post.attachment} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
                        <img className="heartIcon" src="assets/valentine-heart.jpg" onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}