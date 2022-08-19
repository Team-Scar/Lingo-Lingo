import React, {useState, useEffect} from 'react';
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
  const hideModal = globalStore((state) => state.modalOff);

  // useEffect(() => {
  //   hideModal(false);
  // }, []);


  const messagebox = (
    <div className="fitSidebar">
      <SocketProvider id={userId} userName={userName}>
        <ContactsProvider>
          <ConversationsProvider id={userId} userName={userName}>
            <Messages id={userId} userName={userName}/>
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </div>
  );
  return (
    <div>
      {userId !== undefined ? messagebox :
      <Login onIdSubmit={setId} />}
    </div>
  );
};

export default LiveChat;
