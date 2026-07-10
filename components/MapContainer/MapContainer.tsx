'use client'

import { Box } from '@mui/material'
import { Map } from '@vis.gl/react-google-maps'
import { CenterMarker, ResultMarkers } from '../CustomMarker'

export const DEFAULT_CAMERA = {
  center: { lat: 25.033964, lng: 121.564468 },
  zoom: 16,
} as const

const MapContainer: React.FC = () => (
  <Box
    sx={{
      width: '100%',
      height: 'stretch',
      bgcolor: 'grey.50',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Map
      mapId='DEMO_MAP_ID'
      defaultCenter={DEFAULT_CAMERA.center}
      defaultZoom={DEFAULT_CAMERA.zoom}
      gestureHandling='greedy'
      disableDefaultUI
      reuseMaps
    >
      <CenterMarker />
      <ResultMarkers />
    </Map>
  </Box>
)

export default MapContainer
