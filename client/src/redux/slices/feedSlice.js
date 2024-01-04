import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeAndUnlikePost } from "./postSlice";

export const getFeedData = createAsyncThunk("user/getFeedData", async (_, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const data = await axiosClient.get('/user/getFeedData');
        console.log("feed data", data);
        return data.result;
    } catch (e) {
        return Promise.reject(e);
    } finally {
        thunkAPI.dispatch(setLoading(true));
    }
})
export const followAndUnfollowUser = createAsyncThunk("user/followAndUnfollow", async (body, thunkAPI)=>{
    try {
        thunkAPI.dispatch(setLoading(true));
       const data = await axiosClient.post('/user/follow', body);
        console.log("follow or unfollow user", data);
        return data.result.user;
    } catch (e) {
        return Promise.reject(e);
    } finally {
        thunkAPI.dispatch(setLoading(true));
    }
})
const feedSlice = createSlice({
    name: 'feedSlice',
    initialState: {
        feedData: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getFeedData.fulfilled, (state, action) => {
            state.feedData = action.payload
        });
        builder.addCase(likeAndUnlikePost.fulfilled, (state, action) => {
            const post = action.payload;
            const index = state.feedData.posts.findIndex(item => item._id == post._id);
            if(index !== -1) {
                state.feedData.posts[index] =post
            }
        });
        builder.addCase(followAndUnfollowUser.fulfilled, (state, action) => {
            const user = action.payload;
            const index = state?.feedData?.followings.findIndex(item => item._id == user._id);
            if(index !== -1) {
                state?.feedData.followings.splice(index, 1);
            } else {
                state?.feedData.followings.push(user);
            }
        });
    }

})

export default feedSlice.reducer;