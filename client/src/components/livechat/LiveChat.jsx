import React, {useState} from 'react';
import Login from './Login.jsx';
import Messages from './Messages.jsx';
import './livechat.scss';
import {useLocalStorage} from './hooks/useLocalStorage.js';
import {ContactsProvider} from './contexts/ContactsProvider.jsx';
import {ConversationsProvider} from './contexts/ConversationsProvider.jsx';
import {SocketProvider} from './contexts/SocketProvider.jsx';
import globalStore from '../../zustand.js';



const LiveChat = () => {
  const [id, setId] = useLocalStorage('id');
  const userId = globalStore((state) => state.userId);
  const userName = globalStore((state) => state.userName);

  const messagebox = (
    <SocketProvider id={id} userName={userName}>
      <ContactsProvider>
        <ConversationsProvider id={id} userName={userName}>
          <Messages id={id} userName={userName}/>
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
