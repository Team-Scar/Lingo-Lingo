import React from 'react';
import {useParams} from 'react-router-dom';

const User = () => {
  const { username } = useParams();
  return (
    <div style={{position: 'relative', left: '300px', bottom: '-300px'}}>
      <div>{username}</div>
      <div>This is your user profile</div>
    </div>
  );
};

export default User;