import React, {useState} from 'react';
import {useContacts} from './contexts/ContactsProvider.jsx';
import ConversationModalCheckBox from './ConversationModalCheckBox.jsx';
import {useConversations} from './contexts/ConversationsProvider.jsx';
import './modal.scss';


const ConversationModal = ({closeModal}) => {
  const {contacts} = useContacts();
  const {createConversation} = useConversations();

  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const handleCheckboxChange = (id, name) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(id)) {
        return prevSelectedContactIds.filter((prevId) => {
          return id !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, id];
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  };

  return (
    <div className="modalBackgroundDF">
      <div className="modalContainerDF">
        <div className="topHalf">
          <div className="titleCloseBtn">
            <button onClick={() => {
              closeModal(false);
            }}>X</button>
          </div>
          <div className = "EventTitleDF">
            <h1>Create Conversation</h1>
          </div>
        </div>
        <div className="body">
          {contacts.map(((contact, index) => {
            return (<ConversationModalCheckBox key={'index ' + index}
              selectedContactIds={selectedContactIds}
              handleCheckboxChange={handleCheckboxChange}
              controlId={contact.id}
              name={contact.name}
              contactIdSelect={selectedContactIds.includes(contact.id)}
              id={contact.id}/>);
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
