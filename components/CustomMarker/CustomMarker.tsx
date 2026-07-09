'use client'

import useMapStore from '@/domain/map/store'
import type { Result } from '@/domain/results/schema'
import useResultStore, { focusOnResult } from '@/domain/results/store'
import TrackChangesRoundedIcon from '@mui/icons-material/TrackChangesRounded'
import { useTheme } from '@mui/material'
import {
  AdvancedMarker,
  Pin,
  type AdvancedMarkerProps,
} from '@vis.gl/react-google-maps'

const ResultMarker: React.FC<AdvancedMarkerProps & { isFocused: boolean }> = ({
  isFocused,
  ...props
}) => {
  const theme = useTheme()

  return (
    <AdvancedMarker {...props}>
      <Pin
        {...(isFocused && {
          background: theme.palette.primary.light,
          borderColor: theme.palette.primary.dark,
          glyphColor: theme.palette.primary.dark,
          scale: 1.2,
        })}
      />
    </AdvancedMarker>
  )
}

const ResultMarkers: React.FC = () => {
  const result = useResultStore(s => s.result)
  const focusedResult = useResultStore(s => s.focusedResult)
  const handleMarkerClick = (id: Result['id']) => () => {
    focusOnResult(id)
  }

  return result
    ? result.map(r => (
        <ResultMarker
          key={r.id}
          clickable
          position={{ lat: r.latitude, lng: r.longitude }}
          onClick={handleMarkerClick(r.id)}
          isFocused={focusedResult === r.id}
        />
      ))
    : null
}

const CenterMarker: React.FC = () => {
  const center = useMapStore(s => s.center)

  return center ? (
    <AdvancedMarker position={center} clickable={false} anchorTop='-50%'>
      <TrackChangesRoundedIcon
        color='error'
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '50%',
          boxShadow: 2,
        }}
      />
    </AdvancedMarker>
  ) : null
}

export { CenterMarker, ResultMarker, ResultMarkers }
