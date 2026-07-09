import { create } from 'zustand'
import { Result } from './schema'
import useMapStore from '../map/store'

export type ResultStore = {
  focusedResult: Result['id'] | null
  result: Result[]
  loading: boolean
}

const useResultStore = create<ResultStore>(() => ({
  focusedResult: null,
  result: [],
  loading: false,
}))

export default useResultStore

const updateResult = (result: Result[]) => {
  useResultStore.setState({ result })
}

const updateResultLoading = (loading: boolean) => {
  useResultStore.setState({ loading })
}

const focusOnResult = (resultId: Result['id']) => {
  const result =
    useResultStore.getState().result.find(r => r.id === resultId) || null
  useResultStore.setState({ focusedResult: result ? result.id : null })
  const map = useMapStore.getState().map
  if (!result || !map) return
  map.panTo({ lat: result.latitude, lng: result.longitude })
}

const blurResult = () => {
  useResultStore.setState({ focusedResult: null })
}

export { updateResult, updateResultLoading, focusOnResult, blurResult }
