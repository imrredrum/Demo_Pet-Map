'use client'

import { updateCenter } from '@/domain/map/store'
import { NavigationRounded as NavigationRoundedIcon } from '@mui/icons-material'
import { Fab } from '@mui/material'

const Location: React.FC = () => {
  const handleClick = () => {
    const currentLocation = window.navigator.geolocation
    if (!currentLocation) {
      console.error('Geolocation is not supported by this browser.')
      return
    }
    try {
      currentLocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        updateCenter({ lat: latitude, lng: longitude })
      })
    } catch (error) {
      console.error('Error getting current location:', error)
    }
  }

  return (
    <Fab size='small' color='primary' onClick={handleClick}>
      <NavigationRoundedIcon />
    </Fab>
  )
}

export default Location
