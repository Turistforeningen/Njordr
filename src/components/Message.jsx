import React, {Component} from 'react';

const Message = ({children, type}) => (
  <div className={`ui message ${type}`}>{children}</div>
);

export default Message;
