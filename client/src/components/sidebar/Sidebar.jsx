import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LogoFull from '../../../assets/LogoFull.svg';

// Icons
import HomeSVG from '../../../assets/sidebar_icons/Home_Icon.svg';
import ChatSVG from '../../../assets/sidebar_icons/Chat_Icon.svg';

// Styles
import './sidebar.scss';
import '../../global.scss';

const Sidebar = () => {
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
        <Link to='/events'>Lingo Boards</Link>
      </nav>

    </div>
  );
};

export default Sidebar;
