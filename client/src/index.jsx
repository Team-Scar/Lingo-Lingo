import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App.jsx';
import ForumView from './router-test/Home.jsx';
import PageOne from './router-test/PageOne.jsx';

const root = createRoot(document.getElementById('root'));


root.render(
    <div className="appView">
      <BrowserRouter className="nav">
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/home" element={<ForumView />} />
            <Route path="/pageOne" element={<PageOne />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>,
);
