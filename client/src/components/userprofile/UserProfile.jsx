import React, {useContext, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import MfnBtn from '..//mfn_btn/MfnBtn.jsx';
import Modal from '..//Modal/Modal.jsx';
import globalStore from '../../zustand.js';
import NavBtn from '..//Nav_btn/NavBtn.jsx';
import '../../global.scss';

//   //     //userprofle
//   //     //add connection button
//   //       //axios.post to connections table
//   //     //message button
//   //       //react-route to messages
//   // )
// };

const UserProfile = () => {
  const {userID} = useParams();
  const userId = globalStore((state) => state.userId);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3005/profile/${userID}`).then((res)=> {
      console.log(res.data);
      setUser(res.data);
    });
  }, [userID]);

  const Form1 = () => {
    return (<form style={{display: 'grid'}}>
      Add this user to your connections list?
      <button onClick = {() => {
        const obj = {userID: userId, friendID: Number(userID)};
        axios.post('http://localhost:3005/profile/connections', {obj}).then(()=> {
          console.log('Successfully added');
        }).catch((err) => console.log(err));
      }} >Add User</button>
      <button>Cancel</button>
    </form>
    );
  };


  return (
    <div style={{'display': 'flex', 'flex-direction': 'column', 'position': 'relative', 'left': '300px', 'bottom': '-233px', 'justify-content': 'flex-start', 'align-items': 'center', 'width': '100%'}}>
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
      <Modal children={Form1()}/>
      <MfnBtn />
      <NavBtn style = {'profilechat_btn'} path={'/livechat'} />

    </div>
  );
};


export default UserProfile;
