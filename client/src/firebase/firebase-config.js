import {initializeApp} from 'firebase/app';

const firebaseConfig = {

};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export default auth;

