import React, {useState, useEffect} from 'react';
import globalStore from '../../zustand.js';
import HeaderMenu from './HeaderMenu.jsx';
import './header.scss';
import '../../global.scss';

const Header = () => {
  // TODO: headerTitle should update automatically based on sidebar nav link;
  const [headerTitle, setHeaderTitle] = useState('Home');

  useEffect(() => {
    const headerArray = headerState.split('/');
    setHeaderTitle(headerArray[headerArray.length-1]);
  }, [window.location.href]);

  const headerState = globalStore((state) => state.currentPage);

  // console.log(headerTitle);
  const filters = globalStore((state) => state.currentFilters);
  const clearFilters = globalStore((state) => state.clearFilters);
  return (
    <div className='header'>
      <h1 className='header_title'>{headerTitle ? headerTitle : 'All Lingo Boards'}</h1>
      <ul className='header_filter_container'>
        {
          // TODO: li 'clear' should clear filters in state;
        }
        <li className='header_filter' value='clear' onClick={clearFilters}>Home</li>
        {
          // TODO: li's should update based on user onboarding selections;
        }
        <HeaderMenu />
      </ul>
    </div>);
};

export default Header;
