import React from "react";

const Message = ({ message }) => {
  return <div className={message.status}>{message.text}</div>;
};

export default Message;
