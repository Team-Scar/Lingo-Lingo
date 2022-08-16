import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../userauth/AuthContext.jsx';

const User = () => {
  let navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser)
  return (
    <div style={{position: 'relative', left: '300px', bottom: '-300px'}}>
      <div>This is your user profile</div>
      <div>{currentUser.email}</div>
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