import React from 'react';
import TimeAgo from 'react-timeago';


import ForumReply from './Forum_responseform.jsx';

const ForumMessage = (props) => {
  return (
    <>
      <div className="forumMessage">
        <div className="messageHeader">
          <img className="userImage" src={props.response.photo} />
          <p>{ props.response.username }</p>
          <p>{ props.response.timestamp }</p>
        </div>

        <div className="messageText">{ props.response.content }</div>

        <div className="messageFooter">
          <div className="upArrow">UPvote</div>
          <div>{ props.response.vote }</div>
          <div className="downArrow">DOWNvote</div>
          <div onClick={() => {
            document.getElementById('replyTo' + props.response.id).style.display='block';
          }}>REPLY</div>
        </div>

      </div>
      <ForumReply id={'replyTo' + props.response.id} />
    </>
  );
};

export default ForumMessage;
