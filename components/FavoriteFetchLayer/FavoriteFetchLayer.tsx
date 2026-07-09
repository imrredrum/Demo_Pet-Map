'use client'

import type { Favorite } from '@/domain/favorite/schema'
import {
  setFavoriteStore,
  updateFavoriteLoading,
} from '@/domain/favorite/store'
import { sleep } from '@/mock/utils'
import { useEffect, useState } from 'react'

const FavoriteFetchLayer: React.FC = () => {
  const [data, setData] = useState<Favorite[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      setIsLoading(true)
      const data = await sleep(1000, [])
      setData(data)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (data) setFavoriteStore(data)
  }, [data])

  useEffect(() => {
    updateFavoriteLoading(isLoading)
  }, [isLoading])

  return null
}

export default FavoriteFetchLayer
