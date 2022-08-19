import React from 'react';
import {useConversations} from './contexts/ConversationsProvider.jsx';
import './sidebar.scss';



const Conversation = () => {
  const {conversations, selectConversationIndex, selectedConversation, formattedConversations} = useConversations();


  const changeConvo = (event, index) => {
    event.preventDefault();
    selectConversationIndex(index);
  };

  return (
    <div className="sidebarMain">
      {conversations.length > 0 ? conversations.map((conversation, index) => {
        return (
          <div key={'conversationId ' + index} className="convoItems">
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
