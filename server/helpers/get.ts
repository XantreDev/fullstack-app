import { Request } from "express";

export const getKey = (req: Request ) => {
  if (req.cookies?.key) {
    return req.cookies?.key
  }

  const cookie = req.headers.cookie ?? ''
  console.log(cookie)
  const startIndex = cookie?.indexOf?.('key=')
  let endIndex = cookie?.indexOf?.(';', startIndex)
  endIndex = !endIndex || endIndex < 0 ? cookie?.length : endIndex 
  const key = cookie?.slice?.(startIndex, endIndex)?.split?.("=")?.[1] ?? ''
  return key
}