import React from 'react';
import {Outlet, Link} from 'react-router-dom';


const App = () => {
  return (
    <div>
      <nav>
        <Link to="/home">Boards</Link> | {' '}
        <Link to="/pageOne">Page One</Link>
      </nav>
      <Outlet />
      {/* <h1>Hello World</h1> */}
      {/* Home Page */}
    </div>
  );
};

export default App;
