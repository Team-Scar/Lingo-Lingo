import React from 'react';
import TimeAgo from 'react-timeago';
import upvoteIcon from '../../../assets/forum_icons/upvote_icon.svg';
import downvoteIcon from '../../../assets/forum_icons/downvote_icon.svg';
import replyIcon from '../../../assets/forum_icons/reply_icon.svg';

import ForumReply from './Forum_responseform.jsx';

const ForumMessage = (props) => {
  return (

    <div className="forumMessage">
      <div className="responseVotes">
        <img className="upVoteResponse" src={ upvoteIcon } />
        <p id="voteTotal">{ props.response.vote }</p>
        <img className="downVoteResponse" src={ downvoteIcon } />
      </div>

      <div className="messageHeader">
        <div className="messageText">{ props.response.content }</div>
        <div className="userAndTime">
          <em className="messageUser">{props.response.username}</em>
          { ' ' }
          <TimeAgo className="timeago" date={props.response.timestamp} />
        </div>
      </div>

      <img className="replyToResponse" src={ replyIcon } />


    </div>

  );
};

export default ForumMessage;
