// ToastNotification.tsx
import React from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification: React.FC<ToastContainerProps> = () => (
  <ToastContainer
    position="top-center"
    autoClose={false}
    hideProgressBar={false}
  />
);

export default ToastNotification;
