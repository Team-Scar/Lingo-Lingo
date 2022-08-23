import React from 'react';
import TimeAgo from 'react-timeago';
import upvoteIcon from '../../../assets/forum_icons/upvote_icon.svg';
import downvoteIcon from '../../../assets/forum_icons/downvote_icon.svg';
import replyIcon from '../../../assets/forum_icons/reply_icon.svg';

// import ForumReply from './Forum_responseform.jsx';
// import './forumDetails.scss';

const ForumMessage = (props) => {
  // const addComment = (text, responseToID) => {
  //   console.log('addComment', text, responseToID);
  // };

  return (
    <>
      <div className="forumMessage">
        <div className="responseVotes">
          <img className="upVoteResponse" style={{cursor: 'pointer'}} src={ upvoteIcon } />
          <p id="voteTotal">{ props.response.vote }</p>
          <img className="downVoteResponse" style={{cursor: 'pointer'}} src={ downvoteIcon } />
        </div>

        <div className="messageHeader">
          <div className="messageText">{ props.response.content }</div>
          <img className="postImage" src={props.response.photo} />
          <div className="userAndTime">
            <em className="messageUser">{props.response.username}</em>
            { ' ' }
            <TimeAgo className="timeago" date={props.response.timestamp} />
          </div>
        </div>

        <img className="replyToResponse" style={{cursor: 'pointer'}} id={ props.response.id } onClick={() => props.handleReplyClick(props.response.id)} src={ replyIcon } />

      </div>
    </>
  );
};

export default ForumMessage;
