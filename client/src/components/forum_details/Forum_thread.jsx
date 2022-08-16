import React from 'react';

// import forumStore from '../forum/_forumState.js';
import ForumMessage from './Forum_message.jsx';

const ForumThread = (props) => {
  const responses = [
    {
      id: 1,
      response_to_id: '',
      content: 'TEXT TEXT TEXT TEXT TEXT',
      photo: 'https://picsum.photos/id/237/200/300',
      timestamp: '08/16/2022 11:11:11',
      vote: 5,
      user_id: 2,
      post_id: 5,
    },
    {
      id: 2,
      response_to_id: 1,
      content: 'MORE TEXT MORE TEXT MORE TEXT MORE TEXT MORE TEXT',
      photo: 'https://picsum.photos/id/1/200/300',
      timestamp: '08/16/2022 11:15:11',
      vote: 1,
      user_id: 3,
      post_id: 5,
    },
  ];

  return (
    <div className="forumThread">
      {responses.map((response) =>
        <ForumMessage key={response.id} response={response} />,
      )}
    </div>
  );
};

export default ForumThread;
