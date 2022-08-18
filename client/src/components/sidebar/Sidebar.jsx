
import {useNavigate} from 'react-router-dom';
import React, {useContext, useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';
import globalStore from '../../zustand.js';
import {getUserName} from '../../../../server/controllers/sidebar.js';

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
  // useEffect(() => {
  //   axios.get('/userName', globalStore.userId).then((res) => {
  //     console.log(res);
  //   });
  // }, [globalStore.userId]);
  const setCurrentPage = globalStore((state) => state.updateCurrentPage);

  const handleSignOut = async () => {
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
          <Link className={'links'} to='/profile'>Profile</Link>
        </div>
        <div className='link_container' onClick={setCurrentPage}>
          <Link className={'links'} to='/create-account'>Create Account</Link>
        </div>

        <Link to='/profile'>Profile</Link>

        {currentUser ? (
          <>
            <div className='link_container' onClick={setCurrentPage && handleSignOut}>
              <Link className={'links'} to='/'>Sign Out</Link>
            </div>
            <Link className={'links'} to='change-password'>Change Password</Link>
          </>
        ) :
           <div className='link_container' onClick={setCurrentPage}>
             <Link className={'links'} to='signin'>Sign In</Link>
             {/* >>>>>>> 6f7eddab77ed45daef16ebdc3c75351ee2765102 */}
           </div>
        }

        <div className='link_container' onClick={setCurrentPage}>
          <Link className={'links'} to='/events'>Events</Link>
        </div>
        <div className='link_container' onClick={setCurrentPage}>
          <Link className={'links'} to='/connections'>Connections</Link>
        </div>

        <div className='link_container' onClick={setCurrentPage}>
          <Link className={'links'} to='signup'>Sign Up</Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
