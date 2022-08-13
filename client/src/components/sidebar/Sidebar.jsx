import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <h1>Sidebar</h1>
      <BrowserRouter>
        <nav>
          <Link to='/'>Home</Link> | <Link to='/livechat'>Chat</Link> |{' '}
          <Link to='/events'>Events</Link>|{' '}
        </nav>
      </BrowserRouter>
    </div>
  );
};

export default Sidebar;
