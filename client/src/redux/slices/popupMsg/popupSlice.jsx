import { createSlice } from "@reduxjs/toolkit";

export const popupMsgSlice=createSlice({
    name:'popupMsg',
    initialState:{
        isOpen:false,
        msg:''
    },
    reducers:{
        setOpen:(state,action)=>{
            state.isOpen=true;
            state.msg=action.payload;
        },
        setClose:(state)=>{
            state.isOpen=false;
            state.msg=''
        }
    }
});

export const {setOpen,setClose}=popupMsgSlice.actions
export default popupMsgSlice.reducer