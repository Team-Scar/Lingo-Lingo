import React, {useState} from 'react';
import Conversation from './Conversation.jsx';
import Contacts from './Contacts.jsx';
import ConversationModal from './ConversationModal.jsx';


const Sidebar = ({id}) => {
  const [currentTab, setCurrentTab] = useState('Conversation');
  const tabHandler = (event) => {
    setCurrentTab(event.target.innerHTML);
  };
  return (
    <div>
      <button onClick={tabHandler}>Conversation</button>
      <button onClick={tabHandler}>Contacts</button>
      {currentTab === 'Conversation' ? <Conversation /> : <Contacts />}
      <div>Your id is {id}</div>
      {currentTab === 'Conversation' ?
      <button>New Conversation</button> : <button>New Contact</button>
      }
      {/* <button>
        New {currentTab === 'Conversation' ? 'Conversation' : 'Contact'}
      </button> */}
      <ConversationModal />
    </div>
  );
};

export default Sidebar;
