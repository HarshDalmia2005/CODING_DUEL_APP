import { configureStore } from '@reduxjs/toolkit'
import socketReducer from './slices/socket/socketSlice'
import loaderReducer from './slices/loader/loaderSlice'
import timerReducer from './slices/timer/timerSlice'
import popupReducer from './slices/popupMsg/popupSlice'

export const store = configureStore({
    reducer: {
        socket: socketReducer,
        loader: loaderReducer,
        timer: timerReducer,
        popup: popupReducer
    },
})