import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForumView from './components/forum/ForumView.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Header from './components/header/Header.jsx';
import './global.scss';

const App = () => {
  return (
    <div>
      {/* Home Page */}
      <Header />
      <div className='view_port'>
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path='/' element={<ForumView />} />,
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
