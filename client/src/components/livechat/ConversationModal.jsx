import React from 'react';
import './modal.scss';

const ConversationModal = ({closeModal}) => {
  return (
    <div className="modalBackgroundDF">
      <div className="modalContainerDF">
        <div className = "title">
          <h1>This is the Conversation Modal</h1>
        </div>
        <div className="body">
          <p>The next page is awesome!</p>
        </div>
        <div className="footer">
          <button onClick={() => {
            closeModal(false);
          }}>Cancel</button><button>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default ConversationModal;
