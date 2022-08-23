import React, {useState, useEffect} from 'react';
import globalStore from '../../../zustand.js';
import './dropdown.scss';
import '../../../global.scss';
import menuButton from '../../../../assets/sidebar_icons/Vertical_Menu_Icon.svg';
import TileIcon from '../../../../assets/sidebar_icons/TileIcon.svg';

const MyLingoDropdown = (props) => {
  const [display, setDisplay] = useState('none');


  const handleClick = () => {
    if (display === 'none') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  };
  return (
    <div >
      <div className='mylingo_container'>
        <img className='tile_icon icon' onClick={handleClick} src={TileIcon} alt="tile icon" />
        <p className='links mylingo' onClick={handleClick}>My Lingo</p>
        <img className='menu' src={menuButton} alt="menu button" onClick={handleClick} />
      </div>
      <div style={{display: display}}>
        { props.children }
      </div>
    </div>
  );
};

export default MyLingoDropdown;
