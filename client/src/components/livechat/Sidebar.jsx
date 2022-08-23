import React, {useState, useEffect, useRef} from 'react';
import Conversation from './Conversation.jsx';
import Contacts from './Contacts.jsx';
import ConversationModal from './ConversationModal.jsx';
import ContactModal from './ContactModal.jsx';
import globalStore from '../../zustand.js';
import './sidebar.scss';



const Sidebar = ({id}) => {
  const [currentTab, setCurrentTab] = useState('Conversation');
  const [modalOpen, setModalOpen] = useState(false);
  const userName = globalStore((state) => state.userName);

  const tabHandler = (event) => {
    setCurrentTab(event.target.innerHTML);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className='msidebar'>
      <nav className="tabsMenu">
        <button onClick={tabHandler} className='tabs conversation'>Conversation</button>
        <button onClick={tabHandler} className='tabs contacts'>Contacts</button>
      </nav>
      {currentTab === 'Conversation' ? <Conversation /> : <Contacts />}
      <div className="identificationText">
        {/* Hi {userName ? userName : 'visitor'}! */}
        Hi!
        Your user-id is: <span className="identification">{id}</span>
      </div>
      {currentTab === 'Conversation' ?
      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}>New Conversation</button>:
        <button
        className="openModalBtn"
        onClick={() => {
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
