// import React, {createContext, useContext, useState, useEffect} from 'react';
// import {auth, methods} from './firebase';

// const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//   cosnt [currentUser, setCurrentUser] = useState();

//   const signup = (email, password) => {
//     return methods.createUserWithEmailAndPassword(auth, email, password);
//   };

//   useEffect(() => {
//     const unsubscribe = methods.onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });
//     return unsubscribe;
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser,
//         signup,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const uesAuth = () => {
//   return useContext(AuthContext);
// };

