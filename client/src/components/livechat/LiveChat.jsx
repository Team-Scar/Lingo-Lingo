import React from 'react';
import './livechat.scss';

const LiveChat = () => {
  // const bear = bears((state) => state.bears);
  return (
    <div>
      <div id="message-container"></div>
      <form id="send-container">
        <input type="text" id="message-input" />
        <button type="submit" id="send-button">Send</button>
      </form>
    </div>
  );
};

export default LiveChat;
