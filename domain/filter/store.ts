import { create } from 'zustand'
import type { Filter } from './schema'

export type FilterStore = Filter

const useFilterStore = create<FilterStore>(() => ({
  storeTags: [],
  friendlyTags: [],
}))

export default useFilterStore

const updateStoreFilter = (storeTags: Filter['storeTags']) => {
  useFilterStore.setState({ storeTags })
}

const updateFriendlyFilter = (friendlyTags: Filter['friendlyTags']) => {
  useFilterStore.setState({ friendlyTags })
}

export { updateStoreFilter, updateFriendlyFilter }
