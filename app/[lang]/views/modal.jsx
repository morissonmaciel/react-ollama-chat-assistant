import React from 'react';
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import "./modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  const handleOverlayClick = (e) => {
    e.stopPropagation();
    if (onClose) onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-view">
        <button onClick={onClose} className="close-button">
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;