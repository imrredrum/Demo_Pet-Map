import { PlaceBrief } from '../place/schema'

export type Favorite = PlaceBrief & {
  favoriteId: string
  addedAt: Date
}
