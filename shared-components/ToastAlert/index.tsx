import React, { ReactElement, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { makeStyles, createStyles } from '@mui/styles';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Fade from '@mui/material/Slide';
import { AlertProps, Alert as MuiAlert } from '@mui/material';
import { ToastProps, ToastTypes } from './types';
import { selectToastInfo } from '../../redux/features/auth/selector';
import { authActions } from '../../redux/features/auth/slice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles: any = makeStyles(() =>
  createStyles({
    successToast: {
      backgroundColor: '#12872A',
      color: '#fff',
      maxWidth: '28em',
    },
    errorToast: {
      backgroundColor: '#FF0000',
      color: '#fff',
      maxWidth: '28em',
    },
    infoToast: {
      backgroundColor: '#EDF6FE',
      color: '#000',
      maxWidth: '28em',
    },
    warnToast: {
      backgroundColor: '#FFD500',
      color: '#000',
      maxWidth: '28em',
    },
    primaryToast: {
      backgroundColor: '#1E5F91',
      color: '#fff',
      maxWidth: '28em',
    },
  }),
);

function ToastAlert() {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const toastInfo: ToastProps = useAppSelector(selectToastInfo);
  const handleClose = (_event?: Event | React.SyntheticEvent, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(authActions.closeToast());
  };

  const handleToastType = (type: ToastTypes) => {
    switch (type) {
      case 'success':
        return classes.successToast;
      case 'error':
        return classes.errorToast;
      case 'info':
        return classes.infoToast;
      case 'warning':
        return classes.warnToast;
      default:
        return classes.successToast;
    }
  };
  const severity = toastInfo.toastType;
  const message = toastInfo.toastMessage;
  return (
    <Snackbar
      open={toastInfo.showToast}
      autoHideDuration={2000}
      TransitionComponent={Fade}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        className={handleToastType(severity)}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default ToastAlert;
