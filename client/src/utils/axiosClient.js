import axios from "axios"
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from "./localStroageManager"

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
    withCredentials: true
})

axiosClient.interceptors.request.use((request)=>{
    console.log("request", request);
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    request.headers['Authorization'] = `Bearer ${accessToken}`
    console.log("request access token", accessToken);
    return request;
});

axiosClient.interceptors.response.use(async(response)=>{
    const data = response.data;
    console.log("response", response);
    if(data.status === "ok"){
        return data
    }

    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const message = data.message
    
    if(statusCode===401 && originalRequest.url === "/auth/refresh"){
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace('/login/', '_self');
        return Promise.reject(message);
    }
    if(statusCode===401){
        const data = await axiosClient.get('/auth/refresh');
        console.log("data", data);
        if(data.status==='ok'){
            const accessToken = data.result.accessToken;
            setItem(KEY_ACCESS_TOKEN, accessToken);
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return axios(originalRequest)
        }
    }
    return Promise.reject(message);
});