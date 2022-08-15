import React from 'react';
import './header.scss';
import '../../global.scss';

const Header = () => {
  // TODO: headerTitle should update automatically based on sidebar nav link;
  const headerTitle = 'All Lingo Boards';

  return (
    <div className='header'>
      <h1 className='header_title'>{headerTitle}</h1>
      <ul className='header_filter_container'>
        {
          // TODO: li 'clear' should clear filters in state;
        }
        <li className='header_filter' val='clear'>Home</li>
        {
          // TODO: li's should update based on user onboarding selections;
        }
        <li className='header_filter' val='/events'>Temp Filter</li>
      </ul>
    </div>);
};

export default Header;
