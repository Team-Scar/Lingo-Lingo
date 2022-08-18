import React from 'react';
import globalStore from '../../zustand.js';
import '../../global.scss';
import plusIcon from '../../../assets/PlusIcon.svg';
const MfnBtn = (props) => {
  const modalState = globalStore((state) => state.showModal);
  const showModal = globalStore((state) => state.modalOn);
  const hideModal = globalStore((state) => state.modalOff);
  const style = props.style || 'mfn_btn';

  const icon = props.icon || (()=> {
    return <img className='icon' src={plusIcon} />;
  })();

  return (
    <button className={style} onClick={(e) => {
      if (!modalState) {
        showModal();
      } else {
        hideModal();
      }
    }}>{icon}</button>
  );
};

export default MfnBtn;
