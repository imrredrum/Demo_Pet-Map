import FilterPanel from '@/components/FilterPanel'
import Location from '@/components/Location'
import MapContainer from '@/components/MapContainer'
import ResultFetchLayer from '@/components/ResultFetchLayer'
import SearchNearby from '@/components/SearchNearby'
import SearchPlace from '@/components/SearchPlace'
import SearchResult from '@/components/SearchResult'
import { Box, Container, Stack } from '@mui/material'

const MainPage: React.FC = () => (
  <Box sx={{ position: 'relative', height: 'stretch' }}>
    <ResultFetchLayer />

    {/* Map Section */}
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <MapContainer />
    </Box>

    {/* Top Section */}
    <Container
      maxWidth='lg'
      sx={{
        position: 'absolute',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <SearchPlace />
      <FilterPanel />
    </Container>

    {/* Bottom Right Section */}
    <Stack
      spacing={1.5}
      sx={{
        position: 'absolute',
        bottom: 24,
        right: 24,
      }}
    >
      <SearchResult />
      <Location />
    </Stack>

    {/* Bottom Section */}
    <Box
      sx={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <SearchNearby />
    </Box>
  </Box>
)

export default MainPage
