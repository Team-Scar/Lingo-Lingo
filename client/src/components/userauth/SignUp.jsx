import React, {useRef} from 'react';
import {useAuth} from './AuthContext.jsx';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {signup} = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value === passwordConfirmRef.current.value) {
      return setError('Password do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, password.current.value);
    } catch {
      setError('Failed to create an account');
    };
    setLoading(false);
  };

  return (
    <div>
      <div>
        <p>Already have an account?</p>
        <button>Sign In</button>
      </div>
      <h1>Free access 14 days trial</h1>
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
        <button disabled={loading}>Next</button>
      </form>
    </div>
  );
};

export default SignUp;
