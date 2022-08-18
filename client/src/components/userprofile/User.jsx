import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
// import {AuthContext} from '../userauth/AuthContext.jsx';
import axios from 'axios';

const User = () => {
  // let navigate = useNavigate();
  let user = [];
  // const {currentUser} = useContext(AuthContext);
  // console.log(currentUser)
  axios.get('http://localhost:3000/profile/3').then((res)=> {
    user = res.data;
  });
  return (
    <div style={{position: 'relative', left: '300px', bottom: '-300px'}}>
      <div>This is your user profile</div>
      <div>{user.name}</div>
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