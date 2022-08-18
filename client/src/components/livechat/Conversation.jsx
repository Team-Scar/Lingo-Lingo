import React from 'react';
import {useConversations} from './contexts/ConversationsProvider.jsx';


const Conversation = () => {
  const {conversations, selectConversationIndex, selectedConversation, formattedConversations} = useConversations();
  const onClicktest = (event) => {
    event.preventDefault();
    console.log('conversations', conversations);
    console.log('selected Convo', selectedConversation);
  };

  const changeConvo = (event) => {
    event.preventDefault();
  }

  return (
    <div>
      {conversations.length > 0 ? conversations.map((conversation, index) => {
        return (
          <div key={'conversationId ' + index}>
            <button
              onClick={() => selectConversationIndex}
            >
              {conversation.recipients.map((r) => r.name).join(', ')}
            </button>
            <button onClick={onClicktest}>Test</button>
          </div>);
      }): <p>Loading...</p>}
    </div>
  );
};

export default Conversation;
