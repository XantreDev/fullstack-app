import axios from 'axios'
import React, { createContext, useCallback, useState } from 'react'
import { axiosConfig } from '../constants'

export const loginContext = createContext({} as {
  isLogined: boolean,
  isAdmin: boolean,
  setIsLogined: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>,
  logout: () => void
})

const LoginProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isLogined, setIsLogined] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const logout = useCallback(async () => {
    await axios({
      ...axiosConfig,
      method: 'post',
      url: '/unauth'
    })
    setIsLogined(false)
    setIsAdmin(false)
  }, [setIsLogined])
  
  return (
    <loginContext.Provider value={{
      isLogined,
      setIsLogined,
      logout,
      isAdmin,
      setIsAdmin
    }}>
      {children}
    </loginContext.Provider>
  )
}

export default LoginProvider