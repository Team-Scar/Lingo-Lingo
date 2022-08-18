import React, {useState, useEffect} from 'react';
import {auth, methods} from './firebase.js';
import globalStore from '../../zustand.js';
import axios from 'axios';
export const AuthContext = React.createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };


export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(true);
  const changeUserID = globalStore((state )=> state.setUserId);

  const signup = (email, password) => {
    return methods.createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    return methods.signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    return methods.signOut(auth);
  };


  const resetPassword = (email) => {
    return methods.sendPasswordResetEmail(auth, email);
  };

  const changePassword = (password) => {
    return methods.updatePassword(currentUser, password);
  };

  useEffect(() => {
    const unsubscribe = methods.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
      if (user) {
        axios.get('/getUserId', {params: {email: user.email}})
            .then((res) => console.log(res.data.rows[0].id))
            .catch((e) => console.log(e));
      }

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    signup,
    currentUser,
    signin,
    signout,
    resetPassword,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
