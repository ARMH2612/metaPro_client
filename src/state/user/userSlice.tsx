import { Dispatch, createSlice } from "@reduxjs/toolkit";
import api from "../../Utils/api";

export const userSlice = createSlice({
    name: 'user',
    initialState : {
        user : null,
        isLoggedIn : false,
        token : '',
        error : null,
        loading : false
    },
    reducers:{
        checkLoginStatus: (state) => {
            const user = localStorage.getItem('user')
            if(user){
                const parsedUser = JSON.parse(user)
                state.user = JSON.parse(user),
                state.isLoggedIn = true,
                state.token = parsedUser.token,
                state.error = null,
                state.loading = false
            }
        },
        loginStart: (state) => {
            state.loading = true,
            state.error = null
        },
        loginSuccess: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
            state.loading = false
            state.error = null
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout : (state) => {
            state.isLoggedIn = false
            state.user = null
            state.loading = false
            state.error = null
            localStorage.removeItem('user')
        }
    }
})

export const {checkLoginStatus, loginStart, loginSuccess,loginFailure,logout} = userSlice.actions

export const loginUser = (credentials: {
    email : string,
    password : string
}) => async (dispatch : Dispatch) => {
    dispatch(loginStart())
    try{
        const response = await api.post('/auth/login', credentials)
        dispatch(loginSuccess(response.data))
    }catch(error){
        dispatch(loginFailure(error.response.data))
    }
}

export default userSlice.reducer
