import React, {useContext, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import MfnBtn from '..//mfn_btn/MfnBtn.jsx';
import Modal from '..//Modal/Modal.jsx';
import globalStore from '../../zustand.js';


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

  const Form2 = () => {
    return (<form style={{display: 'grid'}}>
      Want to send this user a message?
      <button onClick = {() => {
        navigate('/livechat');
      }} >Message User</button>
      <button>Cancel</button>
    </form>
    );
  };

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
      <Modal children={Form1()}/>
      <MfnBtn />
      {/* <Modal children={Form2()}/>
      <MfnBtn style ={'profilechat_btn'}/> */}
    </div>
  );
};


export default UserProfile;
