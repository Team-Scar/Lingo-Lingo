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
    <div style={{position: 'relative', left: '300px', bottom: '-200px'}}>
      <h2>Change Password</h2>
      {error && <h3>{error}</h3>}
      {message && <h3>{message}</h3>}
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Your Email Address'
          ref={emailRef}
          defaultValue={currentUser.email}
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
        <button disabled={loading}>Confirm</button>
      </form>
      {message ?
      <div><Link to='/'>Home</Link></div> :
      <div><Link to='/'>Cancel</Link></div>
      }

    </div>
  );
};

export default ChangePassword;
