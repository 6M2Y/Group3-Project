// Modal.tsx

import React from "react";
import "../Styles/createPost.css";

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, title, children }) => {
  return (
    <div className="modalContainer">
      <div className="modalStyle">
        {title && (
          <h2 style={{ margin: "0 0 15px 0", textAlign: "center" }}>{title}</h2>
        )}

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "1.2em",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
