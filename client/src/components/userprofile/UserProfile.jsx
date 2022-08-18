import React, {useContext, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

//   //     //userprofle
//   //     //add connection button
//   //       //axios.put
//   //     //message button
//   //       //react-route to messages
//   // )
// };

const UserProfile = () => {
  const {userID} = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:3005/profile/${userID}`).then((res)=> {
      console.log(res.data);
      setUser(res.data);
    });
  }, [userID]);
  return (
    <div style={{position: 'relative', left: '300px', bottom: '-300px'}}>
      <div>This is another user's profile</div>
      <div>{user && user.name}</div>
      <div>Username: {user && user.username}</div>
      <img src= {user && user.photo}
        width="384"
        height="192"/>
      <div>Bio: {user && user.bio}</div>
      <div>Speaks: {user && user.speaks && user.speaks.map((item) => {
        return (<div>Language: {item.language} --- Proficiency: {item.proficiency}</div>);
      })}</div>
      <div>Wants to Learn: {user && user.wants && user.wants.map((item) => {
        return (<div>{item}</div>);
      })}</div>
      <div>Interests: {user && user.interests && user.interests.map((item) => {
        return (<div>{item}</div>);
      })}</div>
    </div>
  );
};

// const UserProfile = () => {
//   return (<div>This is another profle </div>);
// };

//   //     //userprofle
//   //     //add connection button
//   //       //axios.put
//   //     //message button
//   //       //react-route to messages


export default UserProfile;
