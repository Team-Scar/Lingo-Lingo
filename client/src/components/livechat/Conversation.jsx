import React from 'react';
import {useConversations} from './contexts/ConversationsProvider.jsx';


const Conversation = () => {
  const {conversations, selectConversationIndex, selectedConversation, formattedConversations} = useConversations();


  const changeConvo = (event, index) => {
    event.preventDefault();
    selectConversationIndex(index);
  };

  return (
    <div>
      {conversations.length > 0 ? conversations.map((conversation, index) => {
        return (
          <div key={'conversationId ' + index}>
            <button
              onClick={() => {
                changeConvo(event, index);
              }}
            >
              {conversation.recipients.map((r) => r.name).join(', ')}
            </button>
          </div>);
      }): <p>Loading...</p>}
    </div>
  );
};

export default Conversation;
