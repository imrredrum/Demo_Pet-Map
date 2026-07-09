import { create } from 'zustand'
import type { Category, Tag } from './schema'

export type TagStore = {
  category: Category[]
  tag: Tag[]
}

const useTagStore = create<TagStore>(() => ({
  category: [],
  tag: [],
}))

const updateTagStore = (category: Category[], tag: Tag[]) => {
  useTagStore.setState({ category, tag })
}

export default useTagStore

export { updateTagStore }
