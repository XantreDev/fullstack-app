import React, { createContext, useState } from 'react'

export const loginContext = createContext({} as {
  isLogined: boolean,
  setIsLogined: React.Dispatch<React.SetStateAction<boolean>>
})

const LoginProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isLogined, setIsLogined] = useState(false)
  
  return (
    <loginContext.Provider value={{
      isLogined,
      setIsLogined
    }}>
      {children}
    </loginContext.Provider>
  )
}

export default LoginProvider