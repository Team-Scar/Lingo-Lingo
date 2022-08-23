import React from 'react';

const UserAuth = () => {
  return (
    <div>
      <h1>Welcome Back!</h1>
      <form>
        <input type='text' placeholder='Your Email Address' />
        <input type='password' placeholder='Your Password' />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default UserAuth;
