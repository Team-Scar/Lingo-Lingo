import React, {useState} from 'react';
import Conversation from './Conversation.jsx';
import Contacts from './Contacts.jsx';
import ConversationModal from './ConversationModal.jsx';
import ContactModal from './ContactModal.jsx';
<<<<<<< HEAD
import './sidebar.scss';

=======
import './livechat.scss';
>>>>>>> 4382926a5dec51fa4c53fd9d62c77d78a587a7c0


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
<<<<<<< HEAD
      <nav className="tabsMenu">
        <button onClick={tabHandler} className='tabs'>Conversation</button>
        <button onClick={tabHandler} className='tabs'>Contacts</button>
      </nav>
=======
      <button onClick={tabHandler}>Conversation</button>
      <button onClick={tabHandler}>Contacts</button>
>>>>>>> 4382926a5dec51fa4c53fd9d62c77d78a587a7c0
      {currentTab === 'Conversation' ? <Conversation /> : <Contacts />}
      <div className="identificationText">Your user-id is: <span className="identification">{id}</span> </div>
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
