import React from 'react';

const SignIn = () => {
  return (
    <div>
      <div>
        <p>Need an account?</p><button>Sign Up</button>
      </div>
      <h1>Welcome Back!</h1>
      <form>
        <input type='text' placeholder='Your Email Address' />
        <input type='password' placeholder='Your Password' />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
