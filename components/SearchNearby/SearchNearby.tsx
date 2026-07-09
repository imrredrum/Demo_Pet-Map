'use client'

import useMapStore, { updateCenter } from '@/domain/map/store'
import { SearchRounded as SearchRoundedIcon } from '@mui/icons-material'
import { Button } from '@mui/material'

const SearchNearby: React.FC = () => {
  const map = useMapStore(s => s.map)

  const handleClick = () => {
    if (!map) {
      console.warn('Map is not initialized yet.')
      return
    }

    const currentLocation = map.getCenter()
    if (!currentLocation) {
      console.error('Current location is not available.')
      return
    }
    const { lat: latitude, lng: longitude } = currentLocation.toJSON()
    updateCenter({ lat: latitude, lng: longitude })
  }

  return (
    <Button
      variant='outlined'
      color='inherit'
      startIcon={<SearchRoundedIcon />}
      sx={{
        borderRadius: 99,
        bgcolor: 'background.paper',
      }}
      onClick={handleClick}
    >
      搜尋這個區域
    </Button>
  )
}

export default SearchNearby
