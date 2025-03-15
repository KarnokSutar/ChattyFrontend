import Split from 'react-split';
import { Chat } from './components/Chat';
import { Contacts } from './components/Contacts';
import { Header } from './components/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Friends } from './components/Friends';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';
import { RegistrationForm } from './components/Authentication/RegistrationForm';
import { LoginForm } from './components/Authentication/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { chattyActions } from './slices/chatty';
import { authActions } from './slices/Auth';

function App() {
const [ isClose, setClose] = useState(true)
const navigate = useNavigate();
const dispatch = useDispatch()
const isAuthenticated = useSelector(state=>state.Auth.isAuthenticated)
const token = useSelector(state=>state.Auth.token)
const allusers = useSelector(state=>state.chatty.allUsers)


function onCloseHandler(){
setClose(true)
}
function onclickHandler(){
  setClose(false);
}
  //hello
useEffect( ()=>{
    if(!isAuthenticated){
      navigate('/')
      dispatch(authActions.fetchUserData());
      }
      if(isAuthenticated){
        dispatch(authActions.updateUserInfo({ token }))
       dispatch(chattyActions.fetchAllusers({ token }))
        navigate('/chat')
  }
//react-hooks/exhaustive-deps
},[isAuthenticated])
 const  renderUsers = allusers.map((user, index)=>{
   return <Friends key={index} friend = {user} onClick={onCloseHandler}/>
});

  return (
    <div className="app">
      <Header clickHandler = {onclickHandler}/>
     {!isClose && allusers.length !== 0 && <Modal onClose = {onCloseHandler}>{renderUsers}</Modal>}
     < Routes>
     <Route path="/" element = {<RegistrationForm/>}/>
     <Route path="/login" element = {<LoginForm/>}/>

<Route path="/chat" element = {
 <Split
 className='split'
 sizes={[ 50, 175]}
 minSize={[ 25, 100]}
 maxSize={[300, 900]}

 gutterSize={14}
>
 <Contacts />
 <Chat />
</Split>
}/>

{/* <Route path="/search" element = {<Modal onClose = {onCloseHandler}>{renderFriends}</Modal>}/> */}
</Routes>


    </div>
  );
}

export default App;
