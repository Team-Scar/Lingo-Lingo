
import {useNavigate} from 'react-router-dom';
import React, {useContext, useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import globalStore from '../../zustand.js';

import LogoFull from '../../../assets/LogoFull.svg';
import {AuthContext} from '../userauth/AuthContext.jsx';
// Icons
import HomeSVG from '../../../assets/sidebar_icons/Home_Icon.svg';
import ChatSVG from '../../../assets/sidebar_icons/Chat_Icon.svg';
// Styles
import './sidebar.scss';
import '../../global.scss';
const Sidebar = () => {
  const [error, setError] = useState('');
  const {signout, currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const setCurrentPage = globalStore((state) => state.updateCurrentPage);

  const handleSignOut = async () => {
    console.log('click!!');

    setError('');
    try {
      await signout();
      navigate('/');
    } catch (e) {
      console.log('err in log out', e);
      setError('Failed to sign out');
    }
  };

  return (
    <div className='sidebar'>

      {currentUser && <p>{currentUser.email} logged in</p>}
      <img className='lingo_logo' src={LogoFull} alt="Lingo Logo" />
      <nav className='sidebar_navigation'>
        <div onClick={setCurrentPage}>
          <img className='home_icon' src={HomeSVG} alt="home icon" />
          <Link to='/'>Home</Link>
        </div>
        <div onClick={setCurrentPage}>
          <img className='chat_icon' src={ChatSVG} alt="chat icon" />
          <Link to='/livechat'>Chat</Link>
        </div>
        <Link to='/events'>Events</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/connections'>Connections</Link>
        <Link to='signin'>Sign In</Link>
        <Link to='signup'>Sign Up</Link>
        <Link to='/'>Sign Out</Link>


        <Link to='/create-account'>Create Account</Link>
        {currentUser ? (
          <>
            <div onClick={setCurrentPage}>
              <Link to='/'>Sign Out</Link>
            </div>
            <Link to='change-password'>Change Password</Link>
          </>
        ) :
          <div onClick={setCurrentPage}>
            <Link to='signin'>Sign In</Link>
          </div>
        }

        <div onClick={setCurrentPage}>
          <Link to='/events'>Events</Link>
        </div>
        <div onClick={setCurrentPage}>
          <Link to='/connections'>Connections</Link>
        </div>

        <div onClick={setCurrentPage}>
          <Link to='signup'>Sign Up</Link>
        </div>


      </nav>
    </div>
  );
};

export default Sidebar;
