import React, {useRef, useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from './AuthContext.jsx';
import LogoFull from '../../../assets/LogoFull.svg';


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
    <div className='container'>
      <div className='left_logo'>
        <img className='logo' src={LogoFull} alt="Lingo Logo" />
      </div>
      <div className='right_part'>
        <div>
          <div className='title'>
            <span>Password Reset</span>
          </div>
          {message && <h3>{message}</h3>}
          <form onSubmit={handleSubmit} className='sign_in_form'>
            <input
              className ='form_input forgot_pw_input'
              type='text'
              placeholder='Your Email Address'
              ref={emailRef}
              required
            />
            <button className='button'>Reset Password</button>
          </form>
          <div>
          <button className='button sign_in_btn' onClick={() => navigate('/signin')}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
