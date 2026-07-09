'use client'

import useFilterStore from '@/domain/filter/store'
import useMapStore from '@/domain/map/store'
import type { Result } from '@/domain/results/schema'
import { updateResult, updateResultLoading } from '@/domain/results/store'
import { Tag } from '@/domain/tag/schema'
import { generateRandomPlaces, sleep } from '@/mock/utils'
import { useEffect, useMemo, useState } from 'react'

const ResultFetchLayer: React.FC = () => {
  const center = useMapStore(s => s.center)
  const filter = useFilterStore(s => s)
  const [data, setData] = useState<Result[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const filteredTags: Tag['id'][] = useMemo(() => {
    const { storeTags, friendlyTags } = filter
    const set = new Set([...storeTags, ...friendlyTags])
    return Array.from(set)
  }, [filter])

  // Simulate fetching data from an API based on the center coordinates
  useEffect(() => {
    const fetchData = async () => {
      if (!center) {
        setData([])
        return
      }

      console.log(
        '\n',
        'Fetching data for center:',
        center,
        '\n',
        'with filtered tags:',
        filteredTags,
      )

      setIsLoading(true)
      const result = await sleep(
        1000,
        generateRandomPlaces(center.lat, center.lng),
      )
      setData(result)
      setIsLoading(false)
    }

    fetchData()
  }, [center, filteredTags])

  useEffect(() => {
    if (data) updateResult(data)
  }, [data])

  useEffect(() => {
    updateResultLoading(isLoading)
  }, [isLoading])

  return null
}

export default ResultFetchLayer
