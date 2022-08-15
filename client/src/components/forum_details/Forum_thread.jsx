import React from 'react';

// import forumStore from '../forum/_forumState.js';
import ForumMessage from './Forum_message.jsx';

const ForumThread = () => {
  return (
    <div className="forumThread">
      FORUM THREAD STARTS HERE
      <ForumMessage />
      <ForumMessage />
      <ForumMessage />
    </div>
  );
};

export default ForumThread;
