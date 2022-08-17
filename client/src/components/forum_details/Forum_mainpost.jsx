import React from 'react';
const axios = require('axios');
import TimeAgo from 'react-timeago';

import postStore from './_postState.js';

const ForumMainPost = () => {
  const postID = 7;

  const postData = postStore((state) => state.postData);
  const fetched = postStore((state) => state.fetched);
  const setFetched = postStore((state) => state.setFetched);
  const loadPost = postStore((state) => state.loadPost);
  if (fetched === false) {
    axios.get('http://localhost:3005/posts/' + postID)
        .then((results) => {
          loadPost(results.data[0]);
          setFetched();
        });
  }

  return (
    <div className="forumMainPost">
      <div>{ postData.title }</div>
      <div>{ postData.username }</div>
      <div>{ postData.language_name }</div>
      <div>{ postData.jargon_name }</div>
      <div>{ postData.timestamp }</div>
      <div>{ postData.content }</div>
      <img className="postImage" src={postData.photo} />
      <div>REPLY</div>
    </div>
  );
};

export default ForumMainPost;
