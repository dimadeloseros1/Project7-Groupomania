import "../styles/Feed.css"
import Share from "./Share"
import Post from "./Post"
import { AuthContext } from "../App"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { PostsContext } from "../App"
let lastMaxId
export default function Feed({ username }) {
    const [authToken,setAuthtoken] = useContext(AuthContext)
    const [posts, setPosts] = useState([])  
    const {user} = useContext(AuthContext)
    const [isnewpost,setisnewpost] = useContext(PostsContext)
    


    useEffect(() => {

		// Get ID view
		const userId = sessionStorage.getItem('UserId'); 
		axios
		.get(`http://localhost:3001/api/user/${userId}`, {
            headers: {
                authorization: authToken
            },
        })
		.then(res => {
			lastMaxId = res.data.postView;
		})
		.catch(err => {
			console.log(err)
		})

		// Get data for messages
		axios('http://localhost:3001/api/post')
			.then(res => {
				const messages = res.data;
				const getLastestPost = (lastMaxId, array) => {
					let arr =[];
					for (let index = lastMaxId; index < array.length; index++) {
						console.log(array[index]);
						arr.push(array[index]);
					}
					console.log(array);
					return arr;
				}
				let newData = getLastestPost(lastMaxId, messages);
				setPosts(newData);
				console.log(lastMaxId);
			})
			.catch(err => {
				console.log(err)
			})

	}, [])

     
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
                <Post key={p.id} post={p} />
             ))}
            
            </div>
        </div>
    )
}