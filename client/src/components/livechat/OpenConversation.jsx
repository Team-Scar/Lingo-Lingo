import React, {useState, useCallback} from 'react';
import {useConversations} from './contexts/ConversationsProvider.jsx';
import './livechat.scss';

const OpenConversation = () => {
  const [text, setText] = useState('');
  const {sendMessage, selectedConversation} = useConversations();
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({smooth: true});
    }
  }, []);

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
            const lastMessage =
            selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={`indMessage-` + message + index }
<<<<<<< HEAD
                className={`${message.fromMe ? 'messageWrapperMe' : "messageWrapperElse"}`}>
                <div
                  className={`${message.fromMe ? 'messageitselfMe' : "messageitselfElse"}`}
                >
                  {message.text}
                </div>
                <div className={`${message.fromMe ? 'senderNameMe' : "senderNameElse"}`}>
=======
                className="messageWrapper">
                <div
                  className={`messageitself`}
                  // eslint-disable-next-line max-len
                  style={{backgroundColor: 'white'}}
                >
                  {message.text}
                </div>
                <div className="senderName">
>>>>>>> 4382926a5dec51fa4c53fd9d62c77d78a587a7c0
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
<<<<<<< HEAD
      <div className="formbox">
=======
      <form className="formbox">
>>>>>>> 4382926a5dec51fa4c53fd9d62c77d78a587a7c0
        <textarea
          type="text"
          className="chatbox"
          value={text}
          onChange={textListener}>
        </textarea>
        <button onClick={handleSend}>Send Message</button>
<<<<<<< HEAD
      </div>
=======
      </form>
>>>>>>> 4382926a5dec51fa4c53fd9d62c77d78a587a7c0
    </div>
  );
};

export default OpenConversation;
