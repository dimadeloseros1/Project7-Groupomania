import "../styles/Feed.css"
import Share from "./Share"
import Post from "./Post"

import { useEffect, useState } from "react"
import axios from "axios"
export default function Feed() {
    const [posts, setPosts] = useState([])  
    
     
    useEffect(() => {
            const fetchPost = async () => {
            const res = await axios.get("http://localhost:3001/api/post/");
            setPosts(res.data)
        }
        fetchPost()
    },[])
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