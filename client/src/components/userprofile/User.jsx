import React, {useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
// import {AuthContext} from '../userauth/AuthContext.jsx';
import axios from 'axios';
import globalStore from '../../zustand.js';

const User = () => {
  // let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userId = globalStore((state) => state.userId);
  console.log(userId);
  useEffect(() => {
    axios.get(`http://localhost:3005/profile/${userId}`).then((res)=> {
      console.log(res.data);
      setUser(res.data);
    });
  }, [userId]);
  return (
    <div style={{position: 'relative', left: '300px', bottom: '-300px'}}>
      <div>This is your user profile</div>
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

//     // return
//     // userprofile
//     // edit botton
//     // onclick
//     // form
//     // submit
//     // onclick
//     // axios.put
//     // cancel
//     // return to previous page


export default User;
