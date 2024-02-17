import React from "react";
import "./styles.css";

const Modal = (props) => {
  const { children, activeModal } = props;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-content__title">{activeModal.name}</div>
        <div className="modal-content__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
