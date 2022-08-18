import React from 'react';

import postStore from './_postState.js';
import globalStore from './../zustand.js';
import ForumMessage from './Forum_message.jsx';

const ForumThread = (props) => {
  const responsesData = postStore((state) => state.responsesData);
  const userId = globalStore((state) => state.userId);
  const userName = globalStore((state) => state.userName);


  return (
    <div className="forumThread">
      {responsesData.map((response) =>
        <ForumMessage key={response.id} response={response} />,
      )}
    </div>
  );
};

export default ForumThread;
