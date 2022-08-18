import React from 'react';

import './forumDetails.scss';
import ForumMainPost from './Forum_mainpost.jsx';
import ForumThread from './Forum_thread.jsx';
// import globalStore from './../zustand.js';

const ForumDetails = () => {
  return (
    <div className="forumDetails">
      <ForumMainPost />
      <ForumThread />
    </div>
  );
};

export default ForumDetails;
