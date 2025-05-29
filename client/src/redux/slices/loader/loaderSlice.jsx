import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isLoading:false,
        msg:''
    },
    reducers: {
        setLoadingTrue: (state,action) => {
            state.isLoading = true;
            state.msg=action.payload || '';
        },
        setLoadingFalse: (state) => {
            state.isLoading = false;
            state.msg='';
        },
    }
});

export const { setLoadingTrue, setLoadingFalse } = loaderSlice.actions
export default loaderSlice.reducer