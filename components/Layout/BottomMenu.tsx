'use client'

import AddIcon from '@mui/icons-material/Add'
import FavoriteIcon from '@mui/icons-material/Favorite'
import InfoIcon from '@mui/icons-material/Info'
import MapIcon from '@mui/icons-material/Map'
import PersonIcon from '@mui/icons-material/Person'
import {
  BottomNavigation,
  BottomNavigationAction,
  bottomNavigationActionClasses,
} from '@mui/material'
import { usePathname } from 'next/navigation'
import NextLink from '../NextLink'

const BottomMenu: React.FC = () => {
  const pathname = usePathname()

  return (
    <BottomNavigation
      showLabels
      value={pathname.split('/')[1] || 'map'}
      sx={{
        [`& .${bottomNavigationActionClasses.root}.Mui-disabled`]: {
          opacity: theme => theme.palette.action.disabledOpacity,
        },
      }}
    >
      <BottomNavigationAction
        value='map'
        label='地圖'
        icon={<MapIcon />}
        LinkComponent={NextLink}
        href='/'
      />
      <BottomNavigationAction
        value='favorites'
        label='收藏'
        icon={<FavoriteIcon />}
        LinkComponent={NextLink}
        href='/favorites'
      />
      <BottomNavigationAction
        disabled
        value='newSite'
        label='新地點'
        icon={<AddIcon />}
        LinkComponent={NextLink}
        href='/newSite'
      />
      <BottomNavigationAction
        disabled
        value='events'
        label='活動資訊'
        icon={<InfoIcon />}
        LinkComponent={NextLink}
        href='/events'
      />
      <BottomNavigationAction
        disabled
        value='profile'
        label='個人資料'
        icon={<PersonIcon />}
        LinkComponent={NextLink}
        href='/profile'
      />
    </BottomNavigation>
  )
}

export default BottomMenu
