import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { axiosConfig } from './constants';
import { loginContext } from './context/LoginProvider';
import useFetchWithLogin from './hook/useFetchWithLogin';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  const { isLogined, logout } = useContext(loginContext)
  
  const { isLoading } = useFetchWithLogin({
    method: 'get',
    url: '/'
  })

  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Users List
          </Typography>
          { isLogined && <Button onClick={ logout } color="inherit">Logout</Button> }
        </Toolbar>
      </AppBar>
    </Box>
      {
        (() => {
          if (isLoading) return <>Loading</>

          if (isLogined) return <MainPage />

          return <LoginPage />
        })()
}
    </>
  );
}

export default App;
