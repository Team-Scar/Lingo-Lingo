import React from 'react';
import globalStore from '../../zustand.js';
import '../../global.scss';

const MfnBtn = (props) => {
  const modalState = globalStore((state) => state.showModal);
  const showModal = globalStore((state) => state.modalOn);
  const hideModal = globalStore((state) => state.modalOff);

  const icon = props.icon || '+';

  return (
    <button className='mfn_btn' onClick={(e) => {
      if (!modalState) {
        showModal();
      } else {
        hideModal();
      }
    }}>{icon}</button>
  );
};

export default MfnBtn;
