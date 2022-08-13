/* eslint-disable require-jsdoc */
import React from 'react';
import './_forums.scss';

function Cards(props) {
  const {post} = props;
  console.log(post);
  return (
    <div className="card">
      <div className="content">
        <h3 className="cardTitle">{post.title}</h3>
        <p className="cardContent">{post.content}</p>
      </div>
      <div className="info">
        <h6>{post.time} by {post.user}</h6>
        <h5>Lingo: {post.language}</h5>
      </div>
      <div className="interaction">
        <p>{post.votes} votes</p>
        <p>{post.responses} comments</p>
      </div>
    </div>
  );
}

export default Cards;
