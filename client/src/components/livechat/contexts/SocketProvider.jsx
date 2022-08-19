import React, {useContext, useEffect, useState} from 'react';
import io from 'socket.io-client';
// import {server, express, path} from '../../../../../server/index.js';

const SocketContext = React.createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({id, children}) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(
      `http://${window.location.hostname}:3005`,
        {query: {id}},
    );
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
