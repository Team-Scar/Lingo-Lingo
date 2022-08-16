import React from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ForumView from './components/forum/ForumView.jsx';
// import ForumDetails from './components/forum_details/Forum_details.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Events from './components/events/Events4.jsx';
import Header from './components/header/Header.jsx';
import SignUp from './components/userauth/SignUp.jsx';
import SignIn from './components/userauth/SignIn.jsx';
import {AuthProvider} from './components/userauth/AuthContext.jsx';

import User from './components/userprofile/User.jsx';
import UserProfile from './components/userprofile/UserProfile.jsx';
import LiveChat from './components/livechat/LiveChat.jsx';
import './global.scss';

const App = () => {
  return (
    <AuthProvider>
      <div>
        {/* Home Page */}
        <Header />
        <div className='view_port'>
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path='/' element={<ForumView />} />
              {/* <Route path='/' element={<ForumDetails />} /> */}
              <Route path='events' element={<Events />} />
              <Route path='/profile' element={<User />} />
              <Route path='/profile/:username' element={<UserProfile />} />
              {/* <Route path='/profile' element={<User />} >
                <Route path=':username' element={<UserProfile />} />
              </Route> */}
              <Route path='/livechat' element={<LiveChat />} />
              <Route path='signup' element={<SignUp />} />
              <Route path='signin' element={<SignIn />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
