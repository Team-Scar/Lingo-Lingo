import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ForumView from './components/forum/ForumView.jsx';
import ForumDetails from './components/forum_details/Forum_details.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Events from './components/events/Events4.jsx';
import Header from './components/header/Header.jsx';
import SignUp from './components/userauth/SignUp.jsx';
import SignIn from './components/userauth/SignIn.jsx';
import {AuthProvider} from './components/userauth/AuthContext.jsx';
import Rooms from './components/livechat/video/Rooms.jsx'
import VideoChat from './components/livechat/video/VideoChat.jsx'


import User from './components/userprofile/User.jsx';
import UserProfile from './components/userprofile/UserProfile.jsx';

import ForgotPassword from './components/userauth/ForgotPassword.jsx';
import ChangePassword from './components/userauth/ChangePassword.jsx';
import CreateAccount from './components/userauth/CreateAccount.jsx';

import globalStore from './zustand.js';
import Modal from './components/Modal/Modal.jsx';
import MfnBtn from './components/mfn_btn/MfnBtn.jsx';


import LiveChat from './components/livechat/LiveChat.jsx';
import './global.scss';

const App = () => {
  const modalState = globalStore((state) => state.showModal);
  const showModal = globalStore((state) => state.modalOn);
  const hideModal = globalStore((state) => state.modalOff);

  const [roomId, setRoomId] = useState('')

  const getRoomId = () => {
    axios.get(`/livechat/url`)
    .then ((success) => {
      setRoomId(success.data);
    })
    .catch ((error) => {
      console.error(error)
    })
  }

  useEffect(() => {
    getRoomId();
  }, []);

  return (
    <AuthProvider>
      <div>
        Home Page
        {/* <Modal classname='mfn_modal'show={modalState}/> */}
        <Header />
        <div className='view_port'
          // style={modalState ? {filter: 'blur(5px)'} : null}
        >
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path='/' element={<ForumView />} />
              <Route path='/discussions' element={<ForumDetails />} />
              <Route path='events' element={<Events />} />
              <Route path='/profile' element={<User />} />
              <Route path='/profiles/:userID' element={<UserProfile />} />
              {/* <Route path='/' element={<ForumView />} />, */}
              <Route path='/livechat' element={<LiveChat />} />
              <Route path='signup' element={<SignUp />} />
              <Route path='signin' element={<SignIn />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='change-password' element={<ChangePassword />} />
              <Route path='create-account' element={<CreateAccount />} />
              <Route path='/livechat/video//*' element={<Rooms roomId={roomId}/>} />
              <Route path={`/livechat/video/${roomId}`} element={<VideoChat />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
