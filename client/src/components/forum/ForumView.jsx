import React from 'react';
import Sidebar from '../sidebar/Sidebar.jsx';
import Cards from './Cards.jsx';
import './_forums.scss';
const axios = require('axios');

import forumStore from './_forumState.js';
const ForumView = () => {
  const posts = forumStore((state) => state.posts);
  const fetched = forumStore((state) => state.fetched);
  const setFetched = forumStore((state) => state.setFetched);
  const loadPosts = forumStore((state) => state.loadPosts);
  if (fetched === false) {
    axios.get('http://localhost:3005/posts')
        .then((results) => {
          loadPosts(results.data);
          setFetched();
        });
  }

  const handleClick = (e) => {
    console.log(e);
    console.log(e.target.className);
  };

  // console.log(posts);
  return (
    <div className="forumView">
      {posts.map((post, x) => {
        return <Cards key={x + post} post={post} handleClick={handleClick} />;
      })}
    </div>
  );
};

export default ForumView;


// let post = {
//   "title": 'Hello world',
//   "content": 'This is my first forum post!',
//   "photo": null,
//   "time": 'time',
//   "votes": 69,
//   "user": 'David',
//   "language": 'English',
//   "jargon": 'Sleep, Dreams, Nightmares'
// }

// title
// content
// photo
// time
// vote
// user
// language
// jargon (if applicable)
