import { create } from 'zustand'
import { Favorite } from './schema'

export type FavoriteStore = {
  favorites: Favorite[]
  loading: boolean
}

const useFavoriteStore = create<FavoriteStore>(() => ({
  favorites: [],
  loading: false,
}))

export default useFavoriteStore

const setFavoriteStore = (favorites: Favorite[]) => {
  useFavoriteStore.setState({ favorites })
}

const addFavoriteStore = (favorite: Favorite) => {
  const existingFavorite = useFavoriteStore
    .getState()
    .favorites.find(f => f.favoriteId === favorite.favoriteId)
  if (existingFavorite) return
  useFavoriteStore.setState(prevState => ({
    favorites: [favorite, ...prevState.favorites],
  }))
}

const removeFavoriteStore = (favoriteId: Favorite['favoriteId']) => {
  useFavoriteStore.setState(prevState => ({
    favorites: prevState.favorites.filter(f => f.favoriteId !== favoriteId),
  }))
}

const clearFavoriteStore = () => {
  useFavoriteStore.setState({ favorites: [] })
}

const updateFavoriteLoading = (loading: boolean) => {
  useFavoriteStore.setState({ loading })
}

export {
  setFavoriteStore,
  addFavoriteStore,
  removeFavoriteStore,
  clearFavoriteStore,
  updateFavoriteLoading,
}
