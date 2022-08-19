import React, {useState} from 'react';
import Conversation from './Conversation.jsx';
import Contacts from './Contacts.jsx';
import ConversationModal from './ConversationModal.jsx';
import ContactModal from './ContactModal.jsx';
import './livechat.scss';


const Sidebar = ({id}) => {
  const [currentTab, setCurrentTab] = useState('Conversation');
  const [modalOpen, setModalOpen] = useState(false);
  const tabHandler = (event) => {
    setCurrentTab(event.target.innerHTML);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className='msidebar'>
      <button onClick={tabHandler}>Conversation</button>
      <button onClick={tabHandler}>Contacts</button>
      {currentTab === 'Conversation' ? <Conversation /> : <Contacts />}
      <div>Your id is {id}</div>
      {currentTab === 'Conversation' ?
      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}>New Conversation</button>:
        <button onClick={() => {
          setModalOpen(true);
        }}>New Contact</button>
      }
      {(modalOpen && currentTab === 'Conversation') &&
        <ConversationModal closeModal={closeModal}/>}
      {(modalOpen && currentTab === 'Contacts') &&
        <ContactModal closeModal={closeModal}/>}
    </div>
  );
};

export default Sidebar;
