import React, {useState} from 'react';

// eslint-disable-next-line max-len
const ConversationModalCheckBox = ({contactName, controlId, selectedContactIds, handleCheckboxChange}) => {
  return (
    <div>
      <input
        type="checkbox"
        value={selectedContactIds.includes(controlId)}
        onChange={() => handleCheckboxChange(controlId)}></input>
      {contactName}
    </div>
  );
};

export default ConversationModalCheckBox;
