import React from 'react';


// import Sidebar from '../sidebar/Sidebar.jsx';
import './forumDetails.scss';
import ForumMainPost from './Forum_mainpost.jsx';
import ForumThread from './Forum_thread.jsx';
// import forumStore from '../forum/_forumState.js';

const ForumDetails = () => {
  // const posts = forumStore((state) => state.posts);
  return (
    <div className="forumDetails">
      <ForumMainPost />
      <ForumThread />
    </div>
  );
};

export default ForumDetails;
