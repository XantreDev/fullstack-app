import { Request } from "express";

export const getKey = (req: Request) => {
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

export const getRandomValueInRange = (left: number, right: number) => Math.floor(Math.random() * (right - left)) + left


export const getRandomValuesInRange = (left: number, right: number, count: number): number[] => {
  if (right - left <= count) return []

  const set = new Set<number>()
  while (set.size < count) {
    set.add(getRandomValueInRange(left, right))
  }
  return Array.from(set)
}