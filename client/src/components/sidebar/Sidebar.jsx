import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './sidebar.scss';

import '../../global.scss';

const Sidebar = () => {
  return (
    <div>
      <h1 className='header'>Sidebar</h1>


        <nav>
          <Link to='/'>Home</Link> | <Link to='/livechat'>Chat</Link> |{' '}
          <Link to='events'>Events</Link>|
        </nav>

    </div>
  );
};

export default Sidebar;
