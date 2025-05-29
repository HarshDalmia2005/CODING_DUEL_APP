import { configureStore } from '@reduxjs/toolkit'
import socketReducer from './slices/socket/socketSlice'
import loaderReducer from './slices/loader/loaderSlice'

export const store = configureStore({
    reducer: {
        socket: socketReducer,
        loader: loaderReducer
    },
})