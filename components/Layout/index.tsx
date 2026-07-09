'use client'

import { Box, Divider, Stack } from '@mui/material'
import BottomMenu from './BottomMenu'
import MapSynchronizer from './MapSynchronizer'
import FavoriteFetchLayer from '../FavoriteFetchLayer'
import { updateTagStore } from '@/domain/tag/store'
import { MOCK_CATEGORIES, TAG_CATEGORIES } from '@/mock/data'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  // TODO: fetch Tag info from database and set to global store
  updateTagStore(MOCK_CATEGORIES, TAG_CATEGORIES)

  return (
    <>
      <FavoriteFetchLayer />
      <MapSynchronizer />
      <Stack
        direction='column'
        spacing={0}
        sx={{ height: '100dvh', '> *': { flexShrink: 0, flexGrow: 0 } }}
      >
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <Box component='main' sx={{ height: 'stretch', overflow: 'auto' }}>
            {children}
          </Box>
        </Box>
        <Divider />
        <BottomMenu />
      </Stack>
    </>
  )
}

export default Layout
