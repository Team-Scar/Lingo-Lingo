import React from 'react';
import {useNavigate, useParams } from 'react-router-dom';

let user = {
  name: 'John Doe',
  photo: 'https://i.imgur.com/tigb3PX.jpg',
  bio: 'xyz',
  speaks: [
    {language: "French",
     proficiency: '1'}
  ],
  wants: ['English'],
  interest: ['Medical']
}

const UserProfile = () => {
  let navigate = useNavigate();
  let {username} = useParams();
  // if (username = current user) {
    return (
      <div>
        <div>username</div>
        <div>{user.name}</div>
        <img src = {`${user.photo}`}
          width="384"
          height="192" />
        <div>{user.bio}</div>
        <div>{user.name}</div>
        <div>Speaks: {user.name.map(item => {
          <>Language: {item.language} Proficiency : {item.proficiency}</>
        })}</div>
        <div>Wants to Learn: {user.wants.map(item => {
          <>{item}</>
        })}</div>
        <div>Interested In : {user.interests.map(item => {
          <>{item}</>
        })}</div>
      </div>
  // return
        //userprofile
        //edit botton
          //onclick
            //form
            //submit
              //onclick
                //axios.put
            //cancel
         //return to previous page
      )
    // } return (
    // //else
    //   //return
    //     //userprofle
    //     //add connection button
    //       //axios.put
    //     //message button
    //       //react-route to messages
    // )
}

export default UserProfile;
