import "../styles/Feed.css"
import Share from "./Share"
import Post from "./Post"
import { AuthContext } from "../App"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { PostsContext } from "../App"
export default function Feed({ username }) {
    const [authToken,setAuthtoken] = useContext(AuthContext)
    const [posts, setPosts] = useState([])  
    const {user} = useContext(AuthContext)
    const [isnewpost,setisnewpost] = useContext(PostsContext)
     
    useEffect(() => {
            const fetchPost = async () => {
            const res = await axios.get("http://localhost:3001/api/post/",{headers:{
                authorization:authToken
            }});
            setPosts(res.data)
            console.log(posts)
        }
        fetchPost()
    },[isnewpost])
    return (
        <div className="feed">
            
            <div className="feedWrapper">
            <Share />
            {posts.map((p) =>(
                <Post key={p.id} post={p}/>
             ))}

            </div>
        </div>
    )
}