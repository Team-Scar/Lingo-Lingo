<<<<<<< HEAD
import React, {useContext, useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

=======
import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
>>>>>>> ac1cdce (worked on profile)
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

  const handleSignOut = async() => {
    setError('');
    try {
      await signout();
    } catch (e) {
      setError('Failed to sign out');
    }
  };

  return (
    <div className='sidebar'>
      <img className='lingo_logo' src={LogoFull} alt="Lingo Logo" />
      <nav className='sidebar_navigation'>
        <div>
          <img className='home_icon' src={HomeSVG} alt="home icon" />
          <Link to='/'>Home</Link>
        </div>
        <div>
          <img className='chat_icon' src={ChatSVG} alt="chat icon" />
          <Link to='/livechat'>Chat</Link>
        </div>
        <Link to='/events'>Events</Link>
        <Link to='/connections'>Connections</Link>
        <Link to='signin'>Sign In</Link>
        <Link to='signup'>Sign Up</Link>
        <Link to='/'>Sign Out</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
