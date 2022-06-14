import React, { useState, useEffect } from 'react'
import axios from 'axios'
const helloUser = sessionStorage.getItem('UserName');




function DataFetching() {

	
	const [posts, setPosts] = useState ([])

	useEffect(() => {
		//Get data for messages
		axios
			.get('http://localhost:3001/api/post')
			.then(res => {
				setPosts(res.data)
			})
			.catch(err => {
				console.log(err)
			})

	}, [])


	return (
		<span>
				{posts.map(post => (
			<div id="messages">
				<p key={post.id}>Author: {post.username}</p>
				<p key={post.title}>Title: {post.title}</p>
				<p key={post.content}>Title: {post.content}</p>
				<img src={post.img} max-width='300' alt="" />
			</div>
		))}
		</span>

	)
	}

	export default DataFetching