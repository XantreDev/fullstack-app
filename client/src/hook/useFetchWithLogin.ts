import { axiosConfig } from './../constants';
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { loginContext } from '../context/LoginProvider'

const useFetchWithLogin = <T>(config: AxiosRequestConfig) => {
  const { isLogined, setIsLogined, isAdmin, setIsAdmin } = useContext(loginContext)
  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState<T | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const result = (await axios({
          ...axiosConfig,
          ...config
        })).data as T

        if (!isLogined) setIsLogined(true)
        if (document.cookie.includes('is_admin=true') && !isAdmin) {
          setIsAdmin(true)
        }
        setResult(result)
        setIsLoading(false)
      } catch (error) {
        const errorAxios = error as AxiosError
        if (errorAxios?.request?.status === 401) {
          setIsLoading(false)
          setIsLogined(false)
        }
      }
    })()
  }, [config])

  const [returnResult, setReturnResult] = useState(isLoading ? { isLoading } : {
    isLoading,
    result: result as T
  })

  useEffect(() => setReturnResult(isLoading ? { isLoading } : {
    isLoading,
    result: result as T
  }), [result, isLoading])

  return returnResult
}

export default useFetchWithLogin