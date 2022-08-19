import React from 'react';
import globalStore from '../../zustand.js';
import '../../global.scss';
import plusIcon from '../../../assets/PlusIcon.svg';
import {useNavigate} from 'react-router-dom';

const NavBtn = (props) => {
  const navigate = useNavigate();
  const style = props.style || 'mfn_btn';

  const path = props.path || ('/');

  return (
    <button className={style} onClick={(e) => {
      navigate(path);
    }}>{plusIcon}</button>
  );
};

export default NavBtn;
