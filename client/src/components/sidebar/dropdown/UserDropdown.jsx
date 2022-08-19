import React, {useState, useEffect} from 'react';
import globalStore from '../../../zustand.js';
import './dropdown.scss';
import menuButton from '../../../../assets/sidebar_icons/downArrow.svg';

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
    <div >
      <div onClick={handleClick} className='username'>
        {`Hello, ${userName}`}
        <div>
          <img className='menu' src={menuButton} alt="menu button" onClick={handleClick} />
        </div>
      </div>
      <div style={{display: display}}>
        { props.children }
      </div>
    </div>
  );
};

export default UserDropdown;
