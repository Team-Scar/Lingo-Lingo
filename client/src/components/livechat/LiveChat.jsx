import React, {useState} from 'react';
import Login from './Login.jsx';
import Messages from './Messages.jsx';
import './livechat.scss';
import {useLocalStorage} from './hooks/useLocalStorage.js';

const LiveChat = () => {
  const [id, setId] = useLocalStorage('id');
  return (
    <div>
      {id !== undefined ? <Messages id={id}/> : <Login onIdSubmit={setId} />}
    </div>
  );
};

export default LiveChat;
