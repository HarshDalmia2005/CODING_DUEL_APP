import { createSlice } from '@reduxjs/toolkit';

const duelSlice = createSlice({
    name: 'duel',
    initialState: { result: null },
    reducers: {
        setDuelResult: (state, action) => {
            state.result = action.payload;
        }
    }
});

export const { setDuelResult } = duelSlice.actions;
export default duelSlice.reducer;