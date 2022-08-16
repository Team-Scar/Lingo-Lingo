import React, {useRef, useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from './AuthContext.jsx';


const ForgotPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const {resetPassword} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      // console.log(emailRef.current.value);
      await resetPassword(emailRef.current.value);
      console.log(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch (e) {
      console.log('err in reset password', e);
      setError(e.message);
    };
    setLoading(false);
  };

  return (
    <div style={{position: 'relative', left: '300px', bottom: '-200px'}}>
      <h2>Password Reset</h2>
      {message && <h3>{message}</h3>}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Your Email Address'
          ref={emailRef}
          required
        />
        <button>Reset Password</button>
      </form>
      <div>
        <Link to='/signin'>Sign In</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
