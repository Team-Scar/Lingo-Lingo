import React from 'react';
import {useContacts} from './contexts/ContactsProvider.jsx';
import './sidebar.scss';


const Contacts = () => {
  const {contacts} = useContacts();
  console.log(contacts);
  console.log(typeof contacts);

  return (
    <div className="sidebarMain">
        {contacts.length > 0 ? contacts.map((contact, index) => {
          return (
            <div className="contactsWrapper" key={'contactid ' + contact.id}>
              <div  className="contactItems">{
              contact.name}
              </div>
            </div>);
        }): <p>Loading...</p>}
      </div>
  );
};

export default Contacts;
