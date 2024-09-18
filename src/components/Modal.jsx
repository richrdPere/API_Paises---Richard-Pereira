import React from "react";

const Modal = ({ children }) => {
  return (
    <div
      className={`mt-6 lg:mt-0 lg:w-1/2 p-6 bg-white rounded-2xl shadow-lg transition-transform ${
        children.selectedCountry ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      } lg:transition-none`}
    >
      {children}
    </div>
  );
};

export default Modal;
