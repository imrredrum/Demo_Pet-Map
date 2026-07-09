import { Result } from '@/domain/results/schema'
import { PLACES_MATERIAL } from './data'

const sleep = <T = void>(ms: number = 3000, value?: T) =>
  new Promise<T>(resolve =>
    setTimeout(() => {
      resolve(value as T)
    }, ms),
  )

const generateRandomPlaces = (lat: number, lng: number): Result[] => {
  return PLACES_MATERIAL.map(place => {
    const randomLat = lat + (Math.random() - 0.5) * 0.005
    const randomLng = lng + (Math.random() - 0.5) * 0.005
    const distance = Math.sqrt(
      Math.pow(randomLat - lat, 2) + Math.pow(randomLng - lng, 2),
    )

    return {
      ...place,
      latitude: randomLat,
      longitude: randomLng,
      distance,
    }
  })
}

export { sleep, generateRandomPlaces }
