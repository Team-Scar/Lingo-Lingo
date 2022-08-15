import React, {useRef, useState, useContext} from 'react';
// import {useAuth,currentUser} from './AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from './AuthContext.jsx';
import axios from 'axios';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const {signup, currentUser} = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {currentUser, signup} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password do not match');
    }

    try {
      setError('');
      setLoading(true);
      const userCredential = await signup(
          emailRef.current.value, passwordRef.current.value
      );
      // console.log(userCredential.user.uid);
      // uid: "npT294h9zSRjZulZGmcdVfMaHd52"
      navigate('/signin');
      await axios.post('/signup',
          {uid: userCredential.user.uid, email: emailRef.current.value}
      );
    } catch (e) {
      console.log('err in sign up', e.message);
      setError(e.message);
    };

    setLoading(false);
  };

  return (
    <div style={{position: 'relative', left: '300px', bottom: '-300px'}}>
      <div>
        {/* {currentUser.email} */}
        <p>Already have an account?</p>
        <Link to='/signin'>Sign In</Link>
      </div>
      <h1>Free access 14 days trial</h1>
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Your Email Address'
          ref={emailRef}
          required
        />
        <input
          type='password'
          placeholder='Your Password'
          ref={passwordRef}
          required
        />
        <input
          type='password'
          placeholder='Password confirmation'
          ref={passwordConfirmRef}
          required
        />
        <button disabled={loading}>Create an account</button>
      </form>
    </div>
  );
};

export default SignUp;
