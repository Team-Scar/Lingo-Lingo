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
import upvote_icon from '../../../assets/forum_icons/upvote_icon.svg';
import downvote_icon from '../../../assets/forum_icons/downvote_icon.svg';

import forumStore from './_forumState.js';


function Cards(props) {
  const {post} = props;

  const setCurrentPost = forumStore((state) => state.setCurrentPost);
  const loadPosts = forumStore((state) => state.loadPosts);
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

  const filterClick = (e) => {
    console.log(e.target.className);
    console.log(e.target.innerHTML);
    if (e.target.className === 'lang') {
      const params = {'languages': e.target.innerHTML};
      axios.get('http://localhost:3005/posts/filter', {params: params})
          .then((res) => {
            console.log(res.data);
            loadPosts(res.data);
          });
    } else if (e.target.className === 'jarg') {
      const params = {'jargons': e.target.innerHTML};
      axios.get('http://localhost:3005/posts/filter', {params: params})
          .then((res) => {
            // console.log(res.data);
            loadPosts(res.data);
          });
    }
  };

  if (post.photo) {
    return (
      <div className="photoCard">
        <img
          className="image"
          src={post.photo}
          // style={{height: '100px', width: '100px'}}
        />
        <div className="cardContent">
          <div className="content">
            {/* <img src={post.photo}></img> */}
            <h3 className="cardTitle">{post.title}</h3>
            {/* <p className="cardContent">{post.content}</p> */}
          </div>
          <div className="info">
            <h5 className="grey"><TimeAgo date={post.timestamp} /> by <em>{post.username}</em></h5>
            <h5 className="grey">Lingo: <em className="lang" onClick={filterClick}>{post.language_name}</em>, <em className="jarg" onClick={filterClick}>{post.jargon_name}</em></h5>
            {/* <h5>Lingo: <em>{post.jargon_name}</em></h5> */}
          </div>
          <div className="interaction">
            <div className="votes">
              <div className="upPhoto">
                <img
                  src={upvote_icon}
                  className='caretUp'
                  onClick={upvote}
                />
              </div>
              <div className="downPhoto">
                <img
                  src={downvote_icon}
                  className='caretDown'
                  onClick={downvote}
                />
              </div>
              <p className="voteCount" id="vote">{post.vote}</p>
            </div>
            <div className="comments" id={post.title} onClick={showDetails} name={post.id} >
              <img className="commentIcon" src={comment_icon} />
              <p className="commentCount">{post.responses}</p>
            </div>
            <div className="share">
              <RiShareLine className="shareIcon" />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card">
        <div className="cardContent">
          <div className="content">
            {/* <img src={post.photo}></img> */}
            {/* <img
            className="image"
            src={post.photo}
            // style={{height: '100px', width: '100px'}}
          /> */}
            <h3 className="cardTitle">{post.title}</h3>
            {/* <p className="cardContent">{post.content}</p> */}
          </div>
          <div className="info">
            <h5 className="grey"><TimeAgo date={post.timestamp} /> by <em>{post.username}</em></h5>
            <h5 className="grey">Lingo: <em className="lang" onClick={filterClick}>{post.language_name}</em>, <em className="jarg" onClick={filterClick}>{post.jargon_name}</em></h5>
            {/* <h5>Lingo: <em>{post.jargon_name}</em></h5> */}
          </div>
          <div className="interaction">
            <div className="votes">
              <div className="up">
                <img
                  src={upvote_icon}
                  className='caretUp'
                  onClick={upvote}
                />
              </div>
              <div className="down">
                <img
                  src={downvote_icon}
                  className='caretDown'
                  onClick={downvote}
                />
              </div>
              <p className="voteCount" id="vote">{post.vote}</p>
            </div>
            <div
              className="comments"
              id={post.title}
              onClick={showDetails}
              name={post.id}
            >
              <img className="commentIcon" src={comment_icon} />
              <p className="commentCount">{post.responses}</p>
            </div>
            <div className="share">
              <RiShareLine className="shareIcon" />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Cards;
