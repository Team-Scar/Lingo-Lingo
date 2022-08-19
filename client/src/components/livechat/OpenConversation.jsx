import React, {useState} from 'react';
import {useConversations} from './contexts/ConversationsProvider.jsx';
import './livechat.scss';

const OpenConversation = () => {
  const [text, setText] = useState('');
  const {sendMessage, selectedConversation} = useConversations();

  const textListener = (event) => {
    const payload = event.target.value;
    setText(payload);
  };

  const handleSend = (event) => {
    event.preventDefault();
    sendMessage(selectedConversation.recipients.map((r) => r.id), text);
    setText('');
  };

  return (
    <div className="mconvobar">
      <div className="messages">
        <div className="innerMessageBox">

        </div>
      </div>
      <form className="formbox">
        <textarea
          type="text"
          className="chatbox"
          value={text}
          onChange={textListener}>
        </textarea>
        <button onClick={handleSend}>Send Message</button>
      </form>
    </div>
  );
};

export default OpenConversation;
