import React, { useState } from "react";


export function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <form className="inputForm" onSubmit={(event) => sendChat(event)}>
      <input
        type="text"
        placeholder="Type a message..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyPress={event => event.key === 'Enter' ? sendChat(event) : null}
      />
      <button type="submit">Send</button>
    </form>
  );
}