import React, { useRef, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import "./Navbar.scss"
import Avatar from '../avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/slices/appConfigSlice'

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { myProfile } = useSelector(state => state.appConfigReducer)

    function handleLogout(){

    }
    return (
        <nav className="Navbar">
            <div className="container">
                <h2 className="banner" onClick={()=>navigate('/')}>TWINKLE</h2>
                <div className="right-side">
                    <div className="logout" onClick={handleLogout}>
                        <AiOutlineLogout />
                    </div>
                    <div className="profile-photo" onClick={()=>navigate(`/profile/${myProfile?._id}`)}>
                        <Avatar src={myProfile?.avatar?.url}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar