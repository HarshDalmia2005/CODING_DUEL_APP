import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    duration: Number(localStorage.getItem('timer_duration')) || 0,
    time: Number(localStorage.getItem('timer_time')) || 0,
    isRunning: JSON.parse(localStorage.getItem('timer_isRunning')) || false,
    startTimestamp: Number(localStorage.getItem('timer_startTimestamp')) || null,
};

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setStartTime: (state, action) => {
            state.isRunning = true;
            state.duration = action.payload; // total duration in seconds
            state.startTimestamp = Date.now();
            state.time = state.duration;
            localStorage.setItem('timer_duration', state.duration);
            localStorage.setItem('timer_time', state.duration);
            localStorage.setItem('timer_isRunning', true);
            localStorage.setItem('timer_startTimestamp', state.startTimestamp);
        },
        setEnd: (state) => {
            state.isRunning = false;
            state.time = 0;
            state.startTimestamp = null;
            localStorage.setItem('timer_time', 0);
            localStorage.setItem('timer_isRunning', false);
            localStorage.removeItem('timer_startTimestamp');
        },
        updateTime: (state,action) => {
            if (state.isRunning && state.startTimestamp) {
                state.time=action.payload;
                const elapsed = Math.floor((Date.now() - state.startTimestamp) / 1000);
                state.time = Math.max(0, state.duration - elapsed);
                localStorage.setItem('timer_time', state.time);
            }
        }
    }
});

export const { setStartTime, setEnd, updateTime } = timerSlice.actions;
export default timerSlice.reducer;