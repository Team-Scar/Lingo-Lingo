import React, {useState} from 'react';
import Login from './Login.jsx';
import Messages from './Messages.jsx';
import './livechat.scss';
import {useLocalStorage} from './hooks/useLocalStorage.js';
import {ContactsProvider} from './contexts/ContactsProvider.jsx';
import {ConversationsProvider} from './contexts/ConversationsProvider.jsx';


const LiveChat = () => {
  const [id, setId] = useLocalStorage('id');

  const messagebox = (
    <ContactsProvider>
      <ConversationsProvider>
        <Messages id={id}/>
      </ConversationsProvider>
    </ContactsProvider>
  );
  return (
    <div>
      {id !== undefined ? messagebox :
      <Login onIdSubmit={setId} />}
      <div id="message-container"></div>
      <form id="send-container">
        <input type="text" id="message-input" />
        <button type="submit" id="send-button">Send</button>
      </form>
    </div>
  );
};

export default LiveChat;
