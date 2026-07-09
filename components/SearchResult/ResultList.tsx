'use client'

import useResultStore, { focusOnResult } from '@/domain/results/store'
import { Box, Container, IconButton, Stack, Typography } from '@mui/material'
import useFavoriteStore, {
  addFavoriteStore,
  removeFavoriteStore,
} from '@/domain/favorite/store'
import type { Result } from '@/domain/results/schema'
import type { Favorite } from '@/domain/favorite/schema'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded'
import PlaceCard, { PlaceCardSkeleton } from '../PlaceCard'
import NextLink from '../NextLink'
import { useEffect, useId, useRef } from 'react'

const ResultList: React.FC = () => {
  const favoriteId = useId()
  const loading = useResultStore(s => s.loading)
  const result = useResultStore(s => s.result)
  const focusedResult = useResultStore(s => s.focusedResult)
  const favorites = useFavoriteStore(s => s.favorites)

  const handleResultClick = (resultId: Result['id']) => () => {
    focusOnResult(resultId)
  }

  const onAddFavorite = (place: Result) => () => {
    addFavoriteStore({
      ...place,
      favoriteId: favoriteId,
      addedAt: new Date(),
    })
  }

  const onRemoveFavorite = (favoriteId: Favorite['favoriteId']) => () => {
    removeFavoriteStore(favoriteId)
  }

  const focusedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (focusedResult && focusedRef.current) {
      focusedRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [focusedResult])

  return (
    <Container sx={{ height: 'stretch', overflow: 'hidden' }}>
      <Box
        component='section'
        sx={{
          height: 'stretch',
          overflow: 'hidden',
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 2,
          '> *': {
            flexGrow: 0,
            flexShrink: 0,
          },
        }}
      >
        <Typography variant='h6'>搜尋結果清單</Typography>
        <Typography variant='body1'>
          共 {loading ? '...' : result.length} 間友善店家
        </Typography>
        <Stack
          direction='column'
          spacing={2}
          sx={{
            flexGrow: 1,
            flexShrink: 1,
            overflow: 'auto',
            '> *': { flexGrow: 0, flexShrink: 0 },
          }}
        >
          {loading ? (
            Array.from({ length: 3 }, (_, index) => (
              <PlaceCardSkeleton key={index} />
            ))
          ) : result.length === 0 ? (
            <Typography variant='caption' sx={{ fontWeight: 'bold' }}>
              沒有符合條件的店家
            </Typography>
          ) : (
            result.map(place => {
              const favoriteId = favorites.find(
                f => f.id === place.id,
              )?.favoriteId
              const isFocused = focusedResult === place.id

              return (
                <Box
                  key={place.id}
                  onClick={handleResultClick(place.id)}
                  sx={{ cursor: 'pointer' }}
                  ref={isFocused ? focusedRef : null}
                >
                  <PlaceCard
                    place={place}
                    selected={isFocused}
                    action={[
                      <IconButton
                        key='favorite'
                        component='span'
                        size='small'
                        color={favoriteId ? 'error' : 'inherit'}
                        onClick={e => {
                          e.stopPropagation()
                          if (favoriteId) {
                            onRemoveFavorite(favoriteId)()
                          } else {
                            onAddFavorite(place)()
                          }
                        }}
                      >
                        {favoriteId ? (
                          <FavoriteRoundedIcon />
                        ) : (
                          <FavoriteBorderRoundedIcon />
                        )}
                      </IconButton>,
                      <IconButton
                        key='read-more'
                        LinkComponent={NextLink}
                        href={`/place?id=${place.id}`}
                        size='small'
                        color='inherit'
                        onClick={e => {
                          e.stopPropagation()
                        }}
                      >
                        <ReadMoreRoundedIcon />
                      </IconButton>,
                    ]}
                  />
                </Box>
              )
            })
          )}
        </Stack>
      </Box>
    </Container>
  )
}

export default ResultList
