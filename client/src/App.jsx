import React from 'react';
import {Outlet, Link} from 'react-router-dom';

// import ForumView from './components/forums/ForumView.jsx';


const App = () => {
  return (
    <div className="view">
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/pageOne">Page One</Link>
      </nav>
      <Outlet />
      {/* <ForumView /> */}
    </div>
  );
};

export default App;
