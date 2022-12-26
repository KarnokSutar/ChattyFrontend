// import { useDispatch, useSelector } from "react-redux";
import {useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chattyActions } from "../slices/chatty";
import { Card } from "./Card";


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  let children = `${name.toUpperCase().substring(0, 2)}`
  if (name.indexOf(' ') >= 0) {
    children = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }

  return children;
}
export function Friends(props) {
  const dispatch = useDispatch();
  const friendsClassName = useRef()
  const user = useSelector(state => state.Auth.currentUser)
  const token = useSelector(state => state.Auth.token)
  const existingCurrentContactID = useSelector(state => state.chatty.currentContact)
  const currentContactID = props.friend._id
  const color = stringToColor(props.friend.name)

  console.log(props.friend)

  function contactClickHandler() {
    props.onClick();
    dispatch(chattyActions.setCurrentContact({ currentContactID }))
    dispatch(chattyActions.fetchChat({ from: user._id, to: currentContactID, token }))
  }
 
    if (existingCurrentContactID === props.friend._id) {
      friendsClassName.current = "friend-item selected"
    } else{
      friendsClassName.current = "friend-item"
    }



  return (
    <Card className={`friend-item ${friendsClassName.current}`}>
      <div onClick={contactClickHandler}>
        <div style={{ backgroundColor: color }} className="avatar">
          <div className="avatar__letters">
            {stringAvatar(props.friend.name)}
          </div>
        </div>
        <span className="friends-list">
          {props.friend.name}
        </span>
      </div>
    </Card>
  )
}