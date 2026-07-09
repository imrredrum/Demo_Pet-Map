import { Tag } from '../tag/schema'

export type Place = {
  id: string
  placeId: string
  name: string
  address: string
  latitude: number
  longitude: number
  tagIds: Tag['id'][]
  cover: string | null
  album: string[]
  phoneNumber: string | null
  score: 0 | 1 | 2 | 3 | 4 | 5
}

export type PlaceBrief = Pick<
  Place,
  'id' | 'placeId' | 'name' | 'address' | 'score' | 'cover' | 'tagIds'
>
