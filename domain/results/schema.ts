import type { Place, PlaceBrief } from '../place/schema'

export type Result = PlaceBrief &
  Pick<Place, 'latitude' | 'longitude'> & {
    distance: number
  }
