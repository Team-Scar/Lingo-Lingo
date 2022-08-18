import React from 'react';
import {useParams} from 'react-router-dom';

// const user = {
//   name: 'John Doe',
//   username: 'Something',
//   photo: 'https://i.imgur.com/tigb3PX.jpg',
//   bio: 'xyz',
//   speaks: [
//     {language: 'French',
//       proficiency: '1'},
//   ],
//   wants: ['English'],
//   interest: ['Medical'],
// };

// const UserProfile = () => {
//   // const navigate = useNavigate();
//   const {username} = useParams();
//   // if (username = current user) {
//   return (
//     <div>
//       <div>{username}</div>
//       {/* <div>{user.name}</div>
//       <img src ={`${user.photo}`}
//         width="384"
//         height="192" />
//       <div>{user.bio}</div>
//       <div>{user.name}</div> */}
//       {/* <div>Speaks: {user.speaks.map(item => {
//           <>Language: {item.language} Proficiency : {item.proficiency}</>
//         })}</div>
//         <div>Wants to Learn: {user.wants.map(item => {
//           <>{item}</>
//         })}</div>
//         <div>Interested In : {user.interests.map(item => {
//           <>{item}</>
//         })}</div> */}
//     </div>
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
//   );
//   // } return (
//   // //else
//   //   //return
//   //     //userprofle
//   //     //add connection button
//   //       //axios.put
//   //     //message button
//   //       //react-route to messages
//   // )
// };

const UserProfile = () => {
  const { username } = useParams();
  return (
    <div style={{position: 'relative', left: '300px', bottom: '-300px'}}>
      <div>{username}</div>
      <div>This is antoher user profile</div>
    </div>
  );
};


export default UserProfile;
