import React, {useState, useEffect} from 'react';
import globalStore from '../../../zustand.js';

const UserDropdown = (props) => {
  const [display, setDisplay] = useState('none');
  const [userName, setUsername] =useState(currentUserName);
  const currentUserName = globalStore((state) => state.userName);

  useEffect(() => {
    setUsername(currentUserName);
  }, [currentUserName]);

  const handleClick = () => {
    if (display === 'none') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  };
  return (
    <div onClick={handleClick}>
      <div>
        {`Hello, ${userName}`}
      </div>
      <div style={{display: display}}>
        { props.children }
      </div>
    </div>
  );
};

export default UserDropdown;
