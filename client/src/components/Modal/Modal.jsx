import React from 'react';
import globalStore from '../../zustand.js';
import MfnBtn from '../../components/mfn_btn/MfnBtn.jsx';

const Modal = (props) => {
  const modalState = globalStore((state) => state.showModal);
  const showModal = globalStore((state) => state.modalOn);
  const hideModal = globalStore((state) => state.modalOff);

  const content = props.children || (() => {
    return (
      <form><input></input></form>
    );
  })();

  if (!modalState) {
    return null;
  }
  return <div className="mfn_modal">
    <div className="mfn_modal_content">
      <h1>Modal</h1>
      {content}
    </div>
  </div>;
};

export default Modal;
