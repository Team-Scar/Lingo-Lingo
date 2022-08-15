/* eslint-disable require-jsdoc */
import React from 'react';
import TimeAgo from 'react-timeago';
import './_forums.scss';

import {AiFillCaretUp} from 'react-icons/ai';
import {AiFillCaretDown} from 'react-icons/ai';
import {MdOutlineComment} from 'react-icons/md';
import {RiShareLine} from 'react-icons/ri';

function Cards(props) {
  const {post} = props;
  // console.log(post);
  return (
    <div className="card">
      <div className="content">
        <h3 className="cardTitle">{post.title}</h3>
        <p className="cardContent">{post.content}</p>
      </div>
      <div className="info">
        <h5><TimeAgo date={post.timestamp} /> by <em>{post.username}</em></h5>
        <h5>Lingo: <em>{post.language_name}</em></h5>
        <h5>Jargon: <em>{post.jargon_name}</em></h5>
      </div>
      <div className="interaction">
        <div className="votes">
          <AiFillCaretUp className='caretUp'/>
          <AiFillCaretDown className='caretDown' />
          <p>{post.vote}</p>
        </div>
        <div className="comments">
          <MdOutlineComment className="commentIcon" />
          <p>{post.responses}</p>
        </div>
        <div className="share">
          <RiShareLine className="shareIcon" />
        </div>
      </div>
    </div>
  );
}

export default Cards;
