import React from 'react';
import {useAuth} from './AuthContext.jsx';

const SignUp = () => {
  return (
    <div>
      <div>
        <p>Already have an account?</p>
        <button>Sign In</button>
      </div>
      <h1>Free access 14 days trial</h1>
      <form>
        <input
          type='email'
          placeholder='Your Email Address'
          required
        />
        <input
          type='password'
          placeholder='Your Password'
          required
        />
        <input
          type='password'
          placeholder='Password confirmation'
          required
        />
        <button>Next</button>
      </form>
    </div>
  );
};

export default SignUp;
