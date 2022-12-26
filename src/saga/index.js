
import { authActions } from "../slices/Auth"
import { all, put, takeLatest } from 'redux-saga/effects'
import axios from "axios"
import { chattyActions } from "../slices/chatty"
import { saveUserData, clearUserData, requestUserData  } from "../components/api"


// const apiURL = 'http://127.0.0.1:8000/api'
// const apiURL = 'http://192.168.0.101:5000'


const apiURL = 'https://kkschatty-backend.vercel.app'

const authAxios = (token) => axios.create(
  {baseURL: apiURL,
  headers: {
    Authorization: token
  } }
)

function* loginUser({payload}) {
    try {
        const{data} = yield axios.post(`${apiURL}/login`, {
            email: `${payload.email}`,
            password: `${payload.password}`
        })
        console.log(data)
        yield saveUserData(data)
       yield put(authActions.loginSuccess(data))
    } catch (error) {
        console.log(error)
       
         yield put(authActions.loginError(error.message))
    }
  }

  function* registerUser({payload}) {
    try {
        const{data} = yield axios.post(`${apiURL}/register`, {
            name:`${payload.name}`,
            email: `${payload.email}`,
            password: `${payload.pass}`,
            password_confirmation: `${payload.repeatPass}`
        })

        console.log(data)
        yield saveUserData(data)
       yield put(authActions.registerSuccess(data))
    } catch (error) {
        console.log(error)
    }
  }

  function* logoutUser({payload}) {    
    try {
         // yield authAxios(payload).post(`${apiURL}/logout`)  
      yield put(authActions.logoutSuccess())
    } catch (error) {
      yield put(authActions.logoutSuccess())
      console.log(error)
    }
    yield clearUserData();
  }
  function* fetchUserData(){
    console.log("Fetch User Data - saga")
    const user = yield requestUserData()
    console.log(user)
    if (user){ yield put(authActions.loginSuccess(user)) }
  }

  function* fetchAllusers({payload}) {    
    try {
       console.log(payload)
        const {data} = yield authAxios(payload.token).get(`${apiURL}/allusers`)
        console.log(data)
      yield put(chattyActions.successFetchAllUsers(data))
    } catch (error) {
      yield put(authActions.logoutSuccess())
      console.log(error)
    }
  }

  function* addNewChat({payload}) {    
    try {
       console.log(payload)
        const {data} = yield authAxios(payload.token).post(`${apiURL}/newchat`, {
          text:`${payload.text}`,
          from: `${payload.from}`,
          to: `${payload.to}`
      })
        console.log(data)
      yield put(chattyActions.successNewChat(data))
    } catch (error) {
      yield put(authActions.logoutSuccess())
      console.log(error)
    }
  }

  function* fetchChat({payload}) {    
    console.log('Fetch Chat - Saga')
    try {
       console.log(payload.token)
        const {data} = yield authAxios(payload.token).post(`${apiURL}/getchat`, {
          from: `${payload.from}`,
          to: `${payload.to}`
      })
        console.log(data)
      yield put(chattyActions.successFetchChat(data))
    } catch (error) {
      alert(error.message)
      yield put(authActions.logoutSuccess())
      console.log(error)
    }
  }
  function* updateUserInfo({payload}) {    
    try {
       console.log(payload)
        const {data} = yield authAxios(payload.token).get(`${apiURL}/user`)
        console.log(data)
      yield put(authActions.updateUserInfoSuccess(data))
    } catch (error) {
      yield put(authActions.logoutSuccess())
      console.log(error)
    }
  }

  function* rootSaga(){
    yield all([
        takeLatest(authActions.login.type, loginUser),
        takeLatest(authActions.logout.type, logoutUser),
        takeLatest(authActions.register.type, registerUser),
        takeLatest(authActions.fetchUserData.type, fetchUserData),
        takeLatest(chattyActions.fetchAllusers.type, fetchAllusers),
        takeLatest(chattyActions.newChat.type, addNewChat),
        takeLatest(chattyActions.fetchChat.type, fetchChat),
        takeLatest(authActions.updateUserInfo.type, updateUserInfo),
    ])
}
export default rootSaga;


