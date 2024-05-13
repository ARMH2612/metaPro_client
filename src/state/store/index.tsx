import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../user/userSlice'
import studentReducer from '../student/studentSlice'

export const store = configureStore({
    reducer : {
        user : userReducer,
        student : studentReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch