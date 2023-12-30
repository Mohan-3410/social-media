import React, { useEffect } from 'react'
import "./Home.scss"
import { axiosClient } from '../../utils/axiosClient';

function Home() {

    useEffect(() => {
        getAllPost();
    },[]);

    const getAllPost = async() => {
        const posts = await axiosClient.get('/posts/all');
        console.log(posts)
    }
  return (
    <div>Home</div>
  )
}

export default Home