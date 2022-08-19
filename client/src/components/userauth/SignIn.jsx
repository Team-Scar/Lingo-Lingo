import React, {useRef, useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from './AuthContext.jsx';
import './userauth.scss';
import LogoFull from '../../../assets/LogoFull.svg';
import {ImCross} from 'react-icons/im';

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
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
      location.href = `${window.location.href}`;
    } catch (e) {
      console.log('err in sign in', e.message);
      setError('Wrong email or password, please try again!');
      setShowMessage(true);
      emailRef.current.value = '';
      passwordRef.current.value = '';
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
          <p className='need_sign_up'>Need an account?</p>
          <Link to='/signup' className='sign_up_link'>Sign Up</Link>
        </div>
        <div className='title'>
          <span>Welcome </span><span className='title_blue'>Back!</span>
        </div>
        {showMessage &&
        <h3 className='show_message'>
          {error}  <ImCross onClick={() => setShowMessage(false)}/>
        </h3>
        }
        <form onSubmit={handleSubmit} className='sign_up_form'>
          <input
            className='form_input'
            type='text'
            placeholder='Your Email Address'
            ref={emailRef}
            required
          />
          <input
            className='form_input'
            type='password'
            placeholder='Your Password'
            ref={passwordRef}
            required
          />
          <button className='button'>SIGN IN</button>
        </form>
        <div className='link'>
          <Link to='/forgot-password'>Forgot Password?</Link>
          <Link to='/' className='visitor_link'>Sign in as a visitor</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
