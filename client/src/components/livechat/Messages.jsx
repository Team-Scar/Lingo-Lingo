import React from 'react';
import Sidebar from './Sidebar.jsx';
import OpenConversation from './OpenConversation.jsx';
import {useConversations} from './contexts/ConversationsProvider.jsx';
import './livechat.scss';

const Messages = ({id}) => {
  const {selectedConversation} = useConversations();

  return (
    <div className='entireWindow'>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
};

export default Messages;
