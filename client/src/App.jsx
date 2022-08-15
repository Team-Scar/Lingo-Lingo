import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForumView from './components/forum/ForumView.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Events from './components/events/Events.jsx';
import Header from './components/header/Header.jsx';
import './global.scss';
import UserProfile from './components/userprofile/UserProfile.jsx';

const App = () => {
  return (
    <div>
      {/* Home Page */}

      <Header />
      <div className='view_port'>
      <BrowserRouter>
      <Sidebar />
        <Routes>
          <Route path='/' element={<ForumView />} />
          <Route path='events' element={<Events />} />
          <Route path='profile/:username' element={<UserProfile />} />
        </Routes>
        </BrowserRouter>
      </div>
    </div>

  );
};

export default App;
