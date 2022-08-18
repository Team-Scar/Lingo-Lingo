import React, {useRef, useState, useContext} from 'react';
// import {useAuth,currentUser} from './AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from './AuthContext.jsx';
import axios from 'axios';
import LogoFull from '../../../assets/LogoFull.svg';
import './userauth.scss';

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
      console.log(userCredential);
      // uid: "npT294h9zSRjZulZGmcdVfMaHd52"
      navigate('/create-account');
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
    <div className='container'>
      <div className='left_logo'>
        <img className='logo' src={LogoFull} alt="Lingo Logo" />
      </div>
      <div className='right_part'>
        <div className='need_sign_up_container'>
          <p className='need_sign_up'>Already have an account?</p>
          <Link to='/signin' className='sign_up_link'>Sign In</Link>
        </div>
        <div className='sign_up_title'>
          <div className='title'>
            <span>Free access </span><span className='title_blue'>14</span>
          </div>
          <div className='rest_title'>days trials!</div>
        </div>
        {error && <h3>{error}</h3>}
        <form onSubmit={handleSubmit} className='sign_up_form'>
          <input
            className ='form_input'
            type='email'
            placeholder='Your Email Address'
            ref={emailRef}
            required
          />
          <input
            className = 'form_input'
            type='password'
            placeholder='Your Password'
            ref={passwordRef}
            required
          />
          <input
            className = 'form_input'
            type='password'
            placeholder='Password confirmation'
            ref={passwordConfirmRef}
            required
          />
          <button className='button' disabled={loading}>Create an account</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
