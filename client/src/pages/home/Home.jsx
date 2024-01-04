import React, { useEffect } from 'react'
import "./Home.scss"
import { axiosClient } from '../../utils/axiosClient';
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMyInfo } from '../../redux/slices/appConfigSlice';

function Home() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getMyInfo());
    },[])
    return (
        <div className="Home">
            <Navbar />
            <Outlet />
        </div>

    )
}

export default Home