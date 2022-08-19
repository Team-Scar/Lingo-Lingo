import React from 'react';

// eslint-disable-next-line max-len
const ConversationModalCheckBox = ({name, controlId, selectedContactIds, handleCheckboxChange, contactIdSelect, id}) => {
  return (
    <div>
      <input
        type="checkbox"
        value={contactIdSelect}
        onChange={() => handleCheckboxChange(id, name)}></input>
      {name}
    </div>
  );
};

export default ConversationModalCheckBox;
