import React from 'react';
import globalStore from '../../zustand.js';

import './header.scss';
import '../../global.scss';

const HeaderMenu = () => {
  const filters = globalStore((state) => state.currentFilters);
  const addFilters = globalStore((state) => state.addFilter);
  const deleteFilters = globalStore((state) => state.deleteFilter);
  const languages = globalStore((state) => state.userLanguages);
  const jargon = globalStore((state) => state.userTopics);


  // Join filters and jargon arrays from state into one
  const filterArray = languages.concat(jargon);
  const handleClick = (event) => {
    console.log(event.target.id);
    if (filters[event.target.id]) {
      deleteFilters(event.target.id);
    } else {
      addFilters(event.target.id);
    }
    console.log(filters);
  };

  return (
    // Map over the joined array
    filterArray.map((item) => {
      return (
        <li
          key={`1${item}`}
          className='header_filter'
          id={item}
          onClick={(e) => {
            handleClick(e);
          }}>
          {item}
        </li>
      );
    })
  );
};

export default HeaderMenu;
