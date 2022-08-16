import React from 'react';

import forumStore from '../forum/_forumState.js';

const ForumMainPost = () => {
  const postExample = {
    id: 5,
    title: 'THIS IS A TITLE',
    content: 'POST TEXT POST TEXT POST TEXT POST TEXT',
    photo: 'https://picsum.photos/id/1012/200/300',
    timestamp: '08/15/2022 11:22:33',
    vote: 7,
    user_id: 5,
    lang_id: 6,
    jargon_id: 7,
  };

  return (
    <div className="forumMainPost">
      <div>{ postExample.title }</div>
      <div>userName</div>
      <div>Language</div>
      <div>Jargon</div>
      <div>{ postExample.timestamp }</div>
      <div>{ postExample.content }</div>
      <img className="postImage" src={postExample.photo} />
      <div>REPLY</div>
    </div>
  );
};

export default ForumMainPost;
