import React from 'react';
import {useContacts} from './contexts/ContactsProvider.jsx';

const Contacts = () => {
  const {contacts} = useContacts();
  console.log(contacts);
  console.log(typeof contacts);

  return (
    <div>
      {contacts.length > 0 ? contacts.map((contact, index) => {
        return (<div key={'contactid ' + contact.id}>{contact.name}</div>);
      }): <p>Loading...</p>}
    </div>
  );
};

export default Contacts;
