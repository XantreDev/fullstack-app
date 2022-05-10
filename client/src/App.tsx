import axios, { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { axiosConfig } from './constants';
import { loginContext } from './context/LoginProvider';
import useFetchWithLogin from './hook/useFetchWithLogin';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  const { isLogined, setIsLogined } = useContext(loginContext)
  
  const { isLoading } = useFetchWithLogin({
    method: 'get',
    url: '/'
  })

  return (
    <>
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
