import { Grid, IconButton } from '@mui/material'
import type { NextPage } from 'next'
import React from 'react'
import { auth, initializeFirebase } from '../firebase/clientApp'
import { SelectIsUserAuthenticated } from '../redux/features/auth/selector'
import { authActions, login, logout } from '../redux/features/auth/slice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { AuthDrawer } from '../shared-components/Drawer/auth'
import { Header } from '../shared-components/header'
import { AuthButton } from '../shared-components/styled-buttons'
import { Logout } from '@mui/icons-material'
import ToastAlert from '../shared-components/ToastAlert'


const LandingPage: NextPage = () => {

  const dispatch = useAppDispatch();
  const authenticated = useAppSelector(SelectIsUserAuthenticated);

  const openLoginDrawer = () => {
    dispatch(authActions.toggleAuthDrawer({
      isOpen: true,
      type: 'LOGIN',
    }));
  }

  const openRegisterDrawer = () => {
    dispatch(authActions.toggleAuthDrawer({
      isOpen: true,
      type: 'REGISTER',
    }));
  }

  const signOut = () => {
    dispatch(logout());
  }

  const refresh = React.useCallback(
    async (displayName, email, uid) => {
      const userData = {
        displayName,
        email,
        uid,
      };
      return dispatch(login(userData));
    },
    [dispatch]
  );

  React.useEffect(() => {
    initializeFirebase();
    auth.onAuthStateChanged(async user => {
      if (user && !authenticated) {
        return await refresh(user.displayName, user.email, user.uid);
      }
      if (!user && authenticated) {
        dispatch(logout());
      }
    });
  });

  return (
    <div>
      <AuthDrawer />
      <ToastAlert />
      <Header container>
        <Grid item xs={authenticated ? 11 : 10}>
        </Grid>
        {authenticated && <Grid item xs={1} container justifyContent={'flex-end'}>
          <IconButton onClick={signOut}>
            <Logout color={'primary'} />
          </IconButton>
        </Grid>}
        {!authenticated && <Grid item xs={2}>
          <AuthButton style={{
            marginRight: '8px'
          }} onClick={openLoginDrawer}>
            Sign In
          </AuthButton>
          <AuthButton variant='outlined' onClick={openRegisterDrawer} borderRadius={99}>
            Create Account
          </AuthButton>
        </Grid>}
      </Header>
    </div>
  )
}

export default LandingPage
