import { createSlice } from '@reduxjs/toolkit'


export const initialState = {
  chat: [],
  allUsers:[],
  currentContact:""
}

const chatty = createSlice({
  name: 'chatty',
  initialState,
  reducers: {
   fetchAllusers(payload){

   },
   successFetchAllUsers(state, {payload}){
state.allUsers = payload.users
   },
   fetchChat(payload){

  },
  successFetchChat(state, {payload}){
state.chat = payload.chat
console.log(payload)
  },
  newChat(payload){

  },
  successNewChat(state, {payload}){
const previousChat = state.chat
state.chat = [...previousChat, payload.chat]
console.log(payload)
  },
  setCurrentContact(state, {payload}){
state.currentContact = payload.currentContactID
console.log(state.currentContact)
  }
  },
})

export const chattyActions = chatty.actions

export default chatty.reducer
