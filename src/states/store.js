import { configureStore } from '@reduxjs/toolkit'
import setUser from './slices/UserSlice'
import SearchSlice from './slices/SearchSlice'

export const store = configureStore({
    devTools: true,
    reducer:{
        user: setUser,
        search : SearchSlice
    }
}) 