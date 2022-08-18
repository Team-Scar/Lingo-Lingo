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
  const loadResponses = postStore((state) => state.loadResponses);

  if (fetched === false) {
    axios.get('http://localhost:3005/posts/' + postID)
        .then((post) => {
          loadPost(post.data[0]);
          setFetched();
        })
        .then(() => {
          axios.get('http://localhost:3005/responses/' + postID)
              .then((postResponses) => {
                loadResponses(postResponses.data);
              })
              .catch((err) => {
                console.log(err);
              });
        })
        .catch((err) => {
          console.log(err);
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
    </div>
  );
};

export default ForumMainPost;
