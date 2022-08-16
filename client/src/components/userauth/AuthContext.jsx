import React, {useContext, useState, useEffect} from 'react';
import {auth, methods} from './firebase.js';

export const AuthContext = React.createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };


export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return methods.createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    return methods.signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    return methods.signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = methods.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    signup,
    currentUser,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
