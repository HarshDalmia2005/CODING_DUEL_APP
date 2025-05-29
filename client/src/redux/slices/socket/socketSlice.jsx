import { createSlice } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        connected: false,
        roomId: JSON.parse(localStorage.getItem('roomId')) || '',
    },
    reducers: {
        setConnected: (state, action) => {
            state.connected = true;
            state.roomId = action.payload;
            localStorage.setItem('roomId',JSON.stringify(action.payload));
        },
        setDisconnected:(state)=>{
             state.connected=false;
             state.roomId='';
             localStorage.removeItem('roomId');
        }
    }
});

export const { setConnected,setDisconnected } = socketSlice.actions;
export default socketSlice.reducer;