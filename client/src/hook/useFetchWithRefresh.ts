import { AxiosRequestConfig } from 'axios';
import React, {useEffect, useState} from 'react'
import useFetchWithLogin from './useFetchWithLogin'

const useFetchWithRefresh = <T>(propsConfig: AxiosRequestConfig) => {
  const [config, setConfig] = useState(propsConfig)
  const fetchResult = useFetchWithLogin<T>(config)
  const [result, setResult] = useState({
    ...fetchResult,
    update: () => setConfig(config => ({...config}))
  })

  useEffect(() => { setResult(result => ({ ...result, ...(fetchResult as any) }))}, [fetchResult])

  useEffect(() => { setResult(result => ({...result})) }, [config])

  return result
}

export default useFetchWithRefresh