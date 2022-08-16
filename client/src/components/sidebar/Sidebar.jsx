import React, {useContext, useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
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
      {currentUser&&<p>There is a current user {currentUser.email}</p>}
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
        {/* <Link to='/profile'>Profile</Link> */}
        <Link to='/connections'>Connections</Link>
        <Link to='signin'>Sign In</Link>
        <Link to='signup'>Sign Up</Link>
        <Link to='/'>Sign Out</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
