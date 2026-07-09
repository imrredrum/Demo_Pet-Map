import type { Tag } from '../tag/schema'

export type Filter = {
  storeTags: Tag['id'][]
  friendlyTags: Tag['id'][]
}
