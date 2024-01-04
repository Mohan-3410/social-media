import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk("user/getMyInfo", async (_, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const data = await axiosClient.get('/user/getMyInfo');
        return data.result;
    } catch (e) {
        return Promise.reject(e);
    } finally {
        thunkAPI.dispatch(setLoading(true));
    }
})

export const updateMyProfile = createAsyncThunk("user/updateMyProfile", async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const data = await axiosClient.put('/user/', body);
        return data.result;
    } catch (e) {
        return Promise.reject(e);
    } finally {
        thunkAPI.dispatch(setLoading(true));
    }
});

const appConfigSlicer = createSlice({
    name: 'appConfigSlicer',
    initialState: {
        isLoading: false,
        myProfile: {}
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMyInfo.fulfilled, (state, action) => {
            state.myProfile = action.payload.user
        });
        builder.addCase(updateMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload.user
        });
    }

})

export default appConfigSlicer.reducer;
export const { setLoading } = appConfigSlicer.actions;