import React from 'react';

const SignUp = () => {
  return (
    <div>
      <div>
        <p>Already have an account?</p>
        <button>Sign In</button>
      </div>
      <form>
        <input type='text' placeholder='Name' />
        <input type='text' placeholder='UserName' />
        <input type='file'/>
        <textarea placeholder='Bio here' />
        <p>Add a language</p>
        <button>Create Account</button>
      </form>
    </div>
  );
};

export default SignUp;
