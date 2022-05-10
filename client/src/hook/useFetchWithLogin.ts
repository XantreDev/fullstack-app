import { axiosConfig } from './../constants';
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { loginContext } from '../context/LoginProvider'

const useFetchWithLogin = <T>(config: AxiosRequestConfig) => {
  const { isLogined, setIsLogined } = useContext(loginContext)
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
  }, [])

  return isLoading ? { isLoading } : {
    isLoading,
    result: result as T
  }
}

export default useFetchWithLogin