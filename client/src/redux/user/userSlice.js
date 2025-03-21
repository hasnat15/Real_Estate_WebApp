import { createSlice } from "@reduxjs/toolkit";


const initialState={

    currentUser: null,
    error: null,
    loading: false

}


const userSlice= createSlice({

    name: 'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        signInSuccess:(state, action)=>{
            state.currentUser= action.payload
            state.loading=false
            state.error=null
        },
        signInfailure:(state, action)=>{
            state.error= action.payload
            state.loading= false
        },
        updateUserStart:(state)=>{
            state.loading=true
        },
        updateUserSuccess:(state, action)=>{
            state.currentUser= action.payload
            state.loading= false
            state.error= null
        },
        updateUserFailure:(state, action)=>{
            state.error=action.payload
            state.loading=false
        },

        deleteUserStart:(state)=>{
            state.loading=true
            
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null
            state.loading=false
            state.error= null
        },
        deleteUserFailure:(state, action)=>{
            state.error= action.payload
            state.loading= false
        },
        signoutUserStart:(state)=>{
            state.loading=false
        },
        signoutUserFailure:(state,action)=>{
            state.error=action.payload
            state.loading= false
        },
        signoutUserSuccess:(state)=>{
            state.loading=false
            state.error= null
            state.currentUser=null
        }
    }
})

export const { 
    signInStart,
    signInSuccess, 
    signInfailure, 
    updateUserStart, 
    updateUserSuccess, 
    updateUserFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signoutUserFailure,
    signoutUserSuccess,
    signoutUserStart
}= userSlice.actions

export default userSlice.reducer