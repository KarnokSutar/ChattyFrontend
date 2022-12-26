import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chattyActions } from '../slices/chatty';
import { ChatInput } from './ChatInput'
import { io } from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom';
import { authActions } from '../slices/Auth';

let  socket
export function Chat() {
  const scrollRef = useRef();
  // const socket = useRef();
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chatty.chat)
  const currentContact = useSelector(state => state.chatty.currentContact)
  console.log(currentContact)
  const user = useSelector(state => state.Auth.currentUser)
  const token = useSelector(state => state.Auth.token)
  const userId = user._id;
  // useEffect(() => {
  //     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, [chats]);
  useEffect(() => {
    if (user) {
      socket = io("https://kkschatty-backend.vercel.app");
      socket.emit("add-user", user._id);
    }
  }, [user]);
  console.log(socket)

  useEffect(() => {
      console.log(socket)
      socket.on("msg-recieve", (chat) => {
        console.log(chat)
        dispatch(chattyActions.successNewChat({ chat }));
        dispatch(authActions.updateUserInfo({token}))
      });

      return ()=>{ socket.off("msg-recieve")}
  })

  function handleSendMsg(msg) {
    socket.emit("send-msg", {
      from: userId,
      to: currentContact,
      text: msg,
    });
    dispatch(chattyActions.newChat({ from: userId, to: currentContact, text: msg, token }))
    dispatch(authActions.updateUserInfo({token}))
  }

  return (
    <div className="chat">
      <ScrollToBottom className="chat-messages">
        {chats.map((chat, index) => {
          return (
            <div ref={scrollRef} key={index}>
              <div
                className={`message ${chat.sendBy === currentContact ? " received" : "sended"
                  }`}
              >
                <div className="content ">
                  <p>{chat.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  )
}
