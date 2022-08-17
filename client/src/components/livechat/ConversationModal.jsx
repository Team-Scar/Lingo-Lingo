import React from 'react';
import './modalstyle.scss';

const ConversationModal = ({id}) => {
  return (
    <div className="modalBackgroundDF">
      <div className="modalContainerDF">
        <button>X</button>
        <div className = "title">
          <h1>This is the Conversation Modal</h1>
        </div>
        <div className="body">
          <p>The next page is awesome!</p>
        </div>
        <div className="footer">
          <button>Cancel</button><button>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default ConversationModal;
