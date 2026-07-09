'use client'

import NextLink from '@/components/NextLink'
import PlaceCard, { PlaceCardSkeleton } from '@/components/PlaceCard'
import type { Favorite } from '@/domain/favorite/schema'
import useFavoriteStore, { removeFavoriteStore } from '@/domain/favorite/store'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import {
  Container,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

const FavoritesPage: React.FC = () => {
  const favoritePlaces = useFavoriteStore(s => s.favorites)
  const isLoading = useFavoriteStore(s => s.loading)

  const handleRemoveFavorite =
    (favoriteId: Favorite['favoriteId']) =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      removeFavoriteStore(favoriteId)
    }

  return (
    <Container
      maxWidth='lg'
      sx={{ py: 2, height: 'stretch', overflow: 'hidden' }}
    >
      <Paper
        component='section'
        variant='outlined'
        sx={{
          p: 3,
          height: 'stretch',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          '> *': {
            flex: '0 0 auto',
          },
        }}
      >
        <Typography variant='h6' component='h1' gutterBottom>
          我的收藏
        </Typography>
        <Typography variant='body2'>
          {isLoading ? '載入中...' : `共 ${favoritePlaces.length} 間店家`}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack
          spacing={2}
          sx={{ flexGrow: 1, flexShrink: 1, overflow: 'auto' }}
        >
          {isLoading ? (
            Array.from({ length: 2 }).map((_, index) => (
              <PlaceCardSkeleton key={index} />
            ))
          ) : !favoritePlaces.length ? (
            <Typography variant='caption'>尚未收藏店家</Typography>
          ) : (
            favoritePlaces.map(place => (
              <Link
                key={place.favoriteId}
                component={NextLink}
                href={`/place?id=${place.id}`}
                underline='none'
              >
                <PlaceCard
                  place={place}
                  action={
                    <IconButton
                      component='span'
                      size='small'
                      color='error'
                      onClick={handleRemoveFavorite(place.favoriteId)}
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
                  }
                />
              </Link>
            ))
          )}
        </Stack>
      </Paper>
    </Container>
  )
}

export default FavoritesPage
