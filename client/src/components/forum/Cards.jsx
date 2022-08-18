/* eslint-disable require-jsdoc */
import React from 'react';
import {useNavigate} from 'react-router-dom';
import TimeAgo from 'react-timeago';
const axios = require('axios');
import './_forums.scss';

import {AiFillCaretUp} from 'react-icons/ai';
import {AiFillCaretDown} from 'react-icons/ai';
import {MdOutlineComment} from 'react-icons/md';
import {RiShareLine} from 'react-icons/ri';

import comment_icon from '../../../assets/forum_icons/comment_Icon.svg';

import forumStore from './_forumState.js';


function Cards(props) {
  const {post} = props;

  const setCurrentPost = forumStore((state) => state.setCurrentPost);
  const navigate = useNavigate();


  const upvote = (e) => {
    console.log(post.vote);
    axios.post('http://0.0.0.0:3005/upvote', {'id': post.id})
        .then(() => {
          console.log('upvoted');
          document.getElementById('vote').innerHTML = post.vote + 1;
          // v.value = post.vote + 1;
        });
  };

  const downvote = (e) => {
    console.log(post.id);
    axios.post('http://0.0.0.0:3005/downvote', {'id': post.id})
        .then(() => {
          console.log('downvoted');
          document.getElementById('vote').innerHTML = post.vote - 1;
        });
  };

  const showDetails = (e) => {
    console.log(post);
    props.handleClick(e);
    setCurrentPost(post.id);
    navigate('/discussions');
  };

  if (post.photo) {
    return (
      <div className="photoCard">
        <div className="content">
          {/* <img src={post.photo}></img> */}
          <img
            className="image"
            src={post.photo}
            // style={{height: '100px', width: '100px'}}
          />
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
            <AiFillCaretUp
              className='caretUp'
              onClick={upvote}
            />
            <AiFillCaretDown
              className='caretDown'
              onClick={downvote}
            />
            <p id="vote">{post.vote}</p>
          </div>
          <div className="comments" id={post.title} onClick={showDetails} name={post.id} >
            <img className="commentIcon" src={comment_icon} />
            <p>{post.responses}</p>
          </div>
          <div className="share">
            <RiShareLine className="shareIcon" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card">
        <div className="content">
          {/* <img src={post.photo}></img> */}
          <img
            className="image"
            src={post.photo}
            // style={{height: '100px', width: '100px'}}
          />
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
            <AiFillCaretUp
              className='caretUp'
              onClick={upvote}
            />
            <AiFillCaretDown
              className='caretDown'
              onClick={downvote}
            />
            <p id="vote">{post.vote}</p>
          </div>
          <div className="comments" id={post.title} onClick={showDetails} name={post.id} >
            <img className="commentIcon" src={comment_icon} />
            <p>{post.responses}</p>
          </div>
          <div className="share">
            <RiShareLine className="shareIcon" />
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
