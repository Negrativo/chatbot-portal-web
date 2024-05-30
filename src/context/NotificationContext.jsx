import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    isOpen: false,
    message: '',
    type: '', // 'success', 'error', 'warning', 'info'
  });

  const triggerNotification = (message, type) => {
    setNotification({
      isOpen: true,
      message,
      type,
    });
  };

  const closeNotification = () => {
    setNotification({
      ...notification,
      isOpen: false,
    });
  };

  return <NotificationContext.Provider value={{ triggerNotification, closeNotification, notification }}>{children}</NotificationContext.Provider>;
};
