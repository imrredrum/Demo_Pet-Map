'use client'

import { setMap } from '@/domain/map/store'
import { useMap } from '@vis.gl/react-google-maps'
import { useEffect } from 'react'

const MapSynchronizer: React.FC = () => {
  const map = useMap()

  useEffect(() => {
    setMap(map)
  }, [map])

  return null
}

export default MapSynchronizer
