
import {useNavigate} from 'react-router-dom';
import React, {useContext, useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';
import globalStore from '../../zustand.js';
import {getUserName} from '../../../../server/controllers/sidebar.js';
import UserDropdown from './dropdown/UserDropdown.jsx';

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
  const currentUserId = globalStore((state) => {
    return state.userId;
  });
  const {signout, currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const setCurrentPage = globalStore((state) => state.updateCurrentPage);

  const handleSignOut = async () => {
    setError('');
    try {
      await signout();
      navigate(window.location.href);
    } catch (e) {
      console.log('err in log out', e);
      setError('Failed to sign out');
    }
  };

  const dropdownChildren = () => {
    console.log(typeof currentUserId);
    if (currentUserId === 1) {
      return (
        <div className='sidebar_navigation'>
          <div className='link_container dropdownlist' onClick={setCurrentPage}>
            <Link className={'links'} to='/create-account'>Create Account</Link>
          </div>
          <div className='link_container dropdownlist' onClick={setCurrentPage}>
            <Link className={'links'} to='signin'>Sign In</Link>
          </div>
          <div className='link_container dropdownlist' onClick={setCurrentPage}>
            <Link className={'links'} to='signup'>Sign Up</Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className='sidebar_navigation'>
          <div className='link_container dropdownlist' onClick={setCurrentPage}>
            <Link className={'links'} to='/profile'>Profile</Link>
          </div>
          <div className='link_container' onClick = {() => {
            setCurrentPage();
            handleSignOut();
            location.href = `${window.location.href}`;
          }
          }>
            <Link className={'links'} to='/'>Sign Out</Link>
          </div>
          <div className='link_container' onClick={setCurrentPage}>
            <Link className={'links'} to='change-password'>Change Password</Link>
          </div>
        </div>
      );
    };
  };

  return (
    <div className='sidebar'>
      <img className='lingo_logo' src={LogoFull} alt="Lingo Logo" />
      <UserDropdown children={dropdownChildren()} />
      <hr className='divider'></hr>

      <nav className='sidebar_navigation'>
        <div className='link_container' onClick={setCurrentPage}>
          <img className='home_icon icon' src={HomeSVG} alt="home icon" />
          <Link className={'links'} to='/'>Home</Link>
        </div>
        <div className='link_container' onClick={setCurrentPage}>
          <img className='chat_icon icon' src={ChatSVG} alt="chat icon" />
          <Link className={'links chat'} to='/livechat'>Chat</Link>
        </div>
        <div className='link_container' onClick={setCurrentPage}>
          <Link className={'links'} to='/events'>Events</Link>
        </div>
        <div className='link_container' onClick={setCurrentPage}>
          <Link className={'links'} to='/connections'>Connections</Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
