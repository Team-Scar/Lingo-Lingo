import React from 'react';
const axios = require('axios');
import {useNavigate} from 'react-router-dom';
import TimeAgo from 'react-timeago';
import upvoteIcon from '../../../assets/forum_icons/upvote_icon.svg';
import downvoteIcon from '../../../assets/forum_icons/downvote_icon.svg';
import replyIcon from '../../../assets/forum_icons/reply_icon.svg';

import postStore from './_postState.js';
import forumStore from '../forum/_forumState.js';
import globalStore from '../../zustand.js';
import Modal from '../Modal/Modal.jsx';

const ForumMainPost = () => {
  // const postID = 7;
  const postID = forumStore((state) => state.currentPost);
  const setCurrentPost = forumStore((state) => state.setCurrentPost);
  const postData = postStore((state) => state.postData);
  const fetched = postStore((state) => state.fetched);
  const setFetched = postStore((state) => state.setFetched);
  const loadPost = postStore((state) => state.loadPost);
  const loadResponses = postStore((state) => state.loadResponses);
  const navigate = useNavigate();

  const modalState = globalStore((state) => state.showModal);
  const showModal = globalStore((state) => state.modalOn);
  const hideModal = globalStore((state) => state.modalOff);

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
                hideModal();
              })
              .catch((err) => {
                console.log(err);
              });
        })
        .catch((err) => {
          console.log(err);
        });
  }

  const toggleModal = () => {
    if (!modalState) {
      showModal();
    } else {
      hideModal();
    }
  };

  const handleReplyClick = () => {
    toggleModal();
  };


  const ResponseForm = () => {
    const responseObj = {};
    const handleChange = (e) => {
      responseObj[e.target.name] = e.target.value;
    };
    const handleClick = (e) => {
      e.preventDefault();
      responseObj['response_to_id'] = null;
      responseObj['timestamp'] = new Date().toISOString();
      responseObj['vote'] = 0;
      responseObj['user_id'] = userId;
      responseObj['post_id'] = postID;

      axios.post('http://localhost:3005/responses', {responseObj})
          .then(() => {
            axios.get('http://localhost:3005/responses/' + postID)
                .then((postResponses) => {
                  loadResponses(postResponses.data);
                // resetFetched();
                })
                .catch((err) => {
                  console.log(err);
                });
          })
          .catch((err) => {
            console.log(err);
          });
    };
    return (<form className="submitPost">
      <h1>Submit your response</h1>
      <div className="modalField">
        <textarea className="bigInput" name="content" placeholder="content" onChange={handleChange}></textarea>
      </div>
      <div className="modalField">
        <input className="input" name="photo" placeholder="photo url" onChange={handleChange}></input>
      </div>
      <button className="btn" onClick={handleClick}>Submit</button>
      <button className="btn" onClick={toggleModal}>Close</button>
    </form>
    );
  };


  return (
    <>
      <div className="forumMainPost">
        <div className="postVotesR">
          <img className="upVotePostR" style={{cursor: 'pointer'}} src={ upvoteIcon } />
          <p id="postVoteTotal">{ postData.vote }</p>
          <img className="downVotePostR" style={{cursor: 'pointer'}} src={ downvoteIcon } />
        </div>

        <div className="postHeaderR">
          <div className="postTitleR">{ postData.title }</div>

          <div className="userAndTimeR">
            <TimeAgo className="timeagoR" date={postData.timestamp}/>
            <em className="timeagoR">{ ' by ' }</em>
            <em className="postUserR">{postData.username}</em>
          </div>

          <div className="postContentR">{ postData.content }</div>
          <img className="postImage" src={postData.photo} />

        </div>

        <img className="replyToResponse" style={{cursor: 'pointer'}} onClick={() => handleReplyClick()} src={ replyIcon } />

      </div>
      <Modal children={ResponseForm()}/>
    </>
  );
};

export default ForumMainPost;
