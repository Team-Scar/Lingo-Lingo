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
          {selectedConversation.messages.map((message, index) => {
            return (
              <div
                key={`indMessage-` + message + index }
                className="messageWrapper">
                <div
                  className={`messageitself`}
                  // eslint-disable-next-line max-len
                  style={{backgroundColor: 'white'}}
                >
                  {message.text}
                </div>
                <div className="senderName">
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            );
          })}
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
