import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import "./Profile.scss"
import dummyImg from "../../assets/userImg.png"
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postSlice'

function Profile() {
    const [isMyProfile, setIsMyProfile] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { userProfile } = useSelector(state => state.postReducer)
    const { myProfile } = useSelector(state => state.appConfigReducer)
    useEffect(() => {
        dispatch(getUserProfile({
            userId: params.userId
        }))

        setIsMyProfile(myProfile?._id === params.userId)
    }, [myProfile])

    return (
        <div className="Profile">
            <div className="container">
                <div className="left-part">
                    <CreatePost />
                    {userProfile?.posts?.map(post => <Post key={post._id} post={post}/>)}
                </div>
                <div className="right-part">
                    <div className="profile-card">
                        <div className="profile-img">
                            <img src={userProfile?.avatar?.url || dummyImg} alt="dummyImg" />
                        </div>
                        <h3 className="user-name">{userProfile?.name}</h3>
                        <div className="follower-info">
                            <h4>{userProfile?.followers?.length} Followers</h4>
                            <h4>{userProfile?.followings?.length} Followings</h4>
                        </div>
                        <div className="buttons">
                            {isMyProfile && <button className='update-profile' onClick={() => navigate("/updateProfile")}>Update Profile</button>}
                            {!isMyProfile && <button className='follow'>Follow</button>}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile