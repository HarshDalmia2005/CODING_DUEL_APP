import { createSlice } from "@reduxjs/toolkit";

export const timerSlice=createSlice({
    name:'timer',
    initialState:{
        time:0,
        isRunning:false,
    },
    reducers:{
        setStart:(state,action)=>{
            state.isRunning=true,
            state.time=action.payload
            localStorage.setItem('timer',JSON.stringify(state.time))
        },
        setEnd:(state)=>{
            state.isRunning=false;
            state.time=0;
            localStorage.removeItem('timer')
        },
        updateTime:(state,action)=>{
            if(state.time>0 && state.isRunning)state.time-=1,
            localStorage.setItem('timer',JSON.stringify(state.time))
        }
    }
});

export const {setStart,setEnd,updateTime}=timerSlice.actions
export default timerSlice.reducer