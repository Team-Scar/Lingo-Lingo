import React, {useState} from 'react';
import {v4} from 'uuid';
import globalStore from '../../zustand.js';

const Login = ({onIdSubmit}) => {
  const [text, setText] = useState('');
  const userId = globalStore((state) => state.userId);
  const userName = globalStore((state) => state.userName);

  const handleSubmit = (event) => {
    event.preventDefault();
    onIdSubmit(text);
  };

  const handleListener = (event) => {
    const payload = event.target.value;
    setText(payload);
  };

  const createNewId = () => {
    onIdSubmit(v4());
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Your ID"
        value={text}
        onChange={handleListener}>
      </input>
      <button type="submit" onClick={handleSubmit}>Login</button>
      <button type="submit" onClick={createNewId}>Create a New ID</button>
    </div>
  );
};

export default Login;
