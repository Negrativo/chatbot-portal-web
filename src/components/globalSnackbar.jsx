// src/components/GlobalSnackbar.js
import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useNotification } from '../context/NotificationContext';

const GlobalSnackbar = () => {
  const { notification, closeNotification } = useNotification();

  return (
    <Snackbar
      open={notification.isOpen}
      autoHideDuration={6000}
      onClose={closeNotification}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert onClose={closeNotification} severity={notification.type} sx={{ width: '100%' }}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
