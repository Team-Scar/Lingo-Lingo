import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForumView from './components/forum/ForumView.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      {/* Home Page */}
      <Sidebar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ForumView />} />,
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
