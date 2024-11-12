// ToastNotification.tsx
import React from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification: React.FC<ToastContainerProps> = () => (
  // <ToastContainer
  //   position="top-center"
  //   autoClose={10000}
  //   hideProgressBar={false}
  // />
  <ToastContainer
    position="top-center"
    autoClose={7000} // Adjust as needed
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export default ToastNotification;
