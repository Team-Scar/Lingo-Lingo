import React, {useState, useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import './video.scss'


const Rooms = ({roomId}) => {
  return (
    <div>
      {roomId ?
      <Routes>
        <Route path="*" element={<Navigate to={`/livechat/video/${roomId}`} replace />} />
      </Routes>
      : '...Loading'}
    </div>
  );
};

export default Rooms;
