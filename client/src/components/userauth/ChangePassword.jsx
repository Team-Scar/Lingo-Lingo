import React, {useRef, useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from './AuthContext.jsx';


const ChangePassword = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const {currentUser, changePassword} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password do not match');
    }

    try {
      setMessage('');
      setError('');
      setLoading(true);
      const data = await changePassword(passwordRef.current.value);
      console.log('data is !!!!!!', data);
      setMessage('Password has been updated');
    } catch (e) {
      console.log('err in update password', e);
      setError(e.message);
    };
    setLoading(false);
  };

  return (
    <div className='change_password_container'>
      <h2 className='change_password_title'>Change Password</h2>
      {error && <h3>{error}</h3>}
      {message && <h3>{message}</h3>}
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Your Email Address'
          ref={emailRef}
          defaultValue={currentUser.email}
          className='form_input_create_account'
          required
        />
        <input
          type='password'
          placeholder='Your Password'
          ref={passwordRef}
          className='form_input_create_account'
          required
        />
        <input
          type='password'
          placeholder='Password confirmation'
          ref={passwordConfirmRef}
          className='form_input_create_account'
          required
        />
        {message !== 'Password has been updated' &&
          <button disabled={loading} className='button change_pw_btn'>Confirm</button>
        }

      </form>
      { message ?
      <button className='button change_pw_btn' onClick={() => navigate('/')}>Home</button> :
      <button className='button change_pw_btn' onClick={() => navigate('/')}>Cancel</button>
      }

    </div>
  );
};

export default ChangePassword;
