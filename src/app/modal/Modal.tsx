import React from "react";
import ReactDOM from "react-dom";

const Modal = () => {
  return ReactDOM.createPortal(
    <div
      style={{
        width: "100vw",
        height: "100vh",
        top: "0",
        left: "0",
        position:"absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
        backgroundColor: "lightgray", 
      }}
    >
        
    </div>,
    document.body
  );
};
export default Modal;
