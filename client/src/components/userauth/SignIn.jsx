import React, {useRef, useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from './AuthContext.jsx';
import axios from 'axios';

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {signin} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      const userCredential = await signin(emailRef.current.value, passwordRef.current.value);
      console.log(userCredential);
      // await axios.post('/signup')
      navigate('/');
    } catch (e) {
      console.log('err in sign in', e.message);
      setError(e.message);
    };
    setLoading(false);
  };

  return (
    <div style={{position: 'relative', left: '300px', bottom: '-200px'}}>
      <div>
        <p>Need an account?</p><Link to='signup'>Sign Up</Link>
      </div>
      <h1>Welcome Back!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
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
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
