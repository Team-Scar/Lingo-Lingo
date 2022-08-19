import React, {useState} from 'react';
import Login from './Login.jsx';
import Messages from './Messages.jsx';
import './livechat.scss';
import {useLocalStorage} from './hooks/useLocalStorage.js';
import {ContactsProvider} from './contexts/ContactsProvider.jsx';
import {ConversationsProvider} from './contexts/ConversationsProvider.jsx';
import {SocketProvider} from './contexts/SocketProvider.jsx';


const LiveChat = () => {
  const [id, setId] = useLocalStorage('id');

  const messagebox = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Messages id={id}/>
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
  return (
    <div>
      {id !== undefined ? messagebox :
      <Login onIdSubmit={setId} />}
    </div>
  );
};

export default LiveChat;
