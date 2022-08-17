import React, {useState} from 'react';
import {useContacts} from './contexts/ContactsProvider.jsx';
import './modal.scss';

const ConversationModal = ({closeModal}) => {
  const {contacts} = useContacts();
  const handleSubmit = (event) => {
    event.preventDefault();

    closeModal();
  };

  return (
    <div className="modalBackgroundDF">
      <div className="modalContainerDF">
        <div className="titleCloseBtn">
          <button onClick={() => {
            closeModal(false);
          }}>X</button>
        </div>
        <div className = "title">
          <h1>Create Conversation</h1>
        </div>
        <div className="body">
          {contacts.map(((contact, index) => {
            return (<div key={contact.id}>
              <input type="checkbox" />
            </div>);
          }))}
        </div>
        <div className="footer">
          <button onClick={() => {
            handleSubmit(event);
          }}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ConversationModal;
