import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getUserProfile = createAsyncThunk("user/getUserProfile", async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const data = await axiosClient.post('/user/getUserProfile', body);
        console.log(data);
        return data.result;
    } catch (e) {
        return Promise.reject(e);
    } finally {
        thunkAPI.dispatch(setLoading(true));
    }
})

export const likeAndUnlikePost =  createAsyncThunk('post/likeAndUnlike', async (body, thunkAPI)=>{
    try {
        thunkAPI.dispatch(setLoading(true));
        const data = await axiosClient.post('/posts/like', body);
        console.log(data);
        return data.result.post;
    } catch (e) {
        return Promise.reject(e);
    } finally {
        thunkAPI.dispatch(setLoading(true));
    }
})

const postSlice = createSlice({
    name: 'postSlice',
    initialState: {
        userProfile: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload
        });
        builder.addCase(likeAndUnlikePost.fulfilled, (state, action) => {
            const post = action.payload;
            const index = state.userProfile.posts.findIndex(item => item._id == post._id);
            if(index !== -1) {
                state.userProfile.posts[index] =post
            }
        });
    }

})

export default postSlice.reducer;