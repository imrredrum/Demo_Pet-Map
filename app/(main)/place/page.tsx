'use client'

import type { Place } from '@/domain/place/schema'
import useTagStore from '@/domain/tag/store'
import { PLACES_MATERIAL } from '@/mock/data'
import { sleep } from '@/mock/utils'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import {
  Box,
  Chip,
  Container,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const PlacePage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { replace, back } = useRouter()
  const [data, setData] = useState<Place | null>(null)
  const [loading, setLoading] = useState(true)

  const category = useTagStore(s => s.category)
  const tag = useTagStore(s => s.tag)

  useEffect(() => {
    if (!id) {
      replace('/')
      return
    }

    // Simulate fetching place data based on the id from search params with Api to DB
    const fetchPlaceData = async (id: Place['id']) => {
      setLoading(true)
      const result = await sleep(
        1500,
        PLACES_MATERIAL.find(place => place.id === id) ?? null,
      )
      if (result) setData({ ...result, latitude: 0, longitude: 0 })
      setLoading(false)
    }
    fetchPlaceData(id)
  }, [id, replace])

  const storeTypeTags = data?.tagIds.filter(id => {
    const tagItem = tag.find(t => t.id === id)
    return (
      tagItem &&
      tagItem.categoryId === category.find(c => c.name === '餐廳類型')?.id
    )
  })

  const friendlyTypeTags = data?.tagIds.filter(id => {
    const tagItem = tag.find(t => t.id === id)
    return (
      tagItem &&
      tagItem.categoryId === category.find(c => c.name === '友善標籤')?.id
    )
  })

  return (
    <Container sx={{ py: 4 }}>
      <Box component='section'>
        {loading || data ? (
          <>
            <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
              <IconButton onClick={back}>
                <ArrowBackIosRoundedIcon />
              </IconButton>
              <Typography
                variant='h5'
                component='h1'
                sx={{ fontWeight: 'bold' }}
              >
                {loading ? (
                  <Skeleton
                    variant='text'
                    height={32}
                    width={200}
                    animation='wave'
                  />
                ) : (
                  data?.name
                )}
              </Typography>
            </Stack>
            {loading ? (
              <Stack sx={{ mt: 2 }}>
                <Skeleton variant='text' width='75%' animation='wave' />
                <Skeleton variant='text' width='20%' animation='wave' />
                <Skeleton variant='text' width='50%' animation='wave' />
              </Stack>
            ) : (
              <Typography variant='body1' sx={{ mt: 2 }}>
                地址：
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data?.address ?? '')}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {data?.address}
                </Link>
                <br />
                評分：{data?.score} / 5
                <br />
                電話：{data?.phoneNumber}
              </Typography>
            )}

            <Typography variant='subtitle2' sx={{ mt: 2, mb: 1 }}>
              餐廳類型
            </Typography>
            <Stack
              direction='row'
              spacing={1}
              useFlexGap
              sx={{ alignItems: 'center', flexWrap: 'wrap' }}
            >
              {loading &&
                Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant='rounded'
                    width={80}
                    height={32}
                    sx={{ borderRadius: 16 }}
                  />
                ))}
              {storeTypeTags?.map(id => (
                <Chip key={id} label={tag.find(t => t.id === id)?.name} />
              ))}
            </Stack>

            <Typography variant='subtitle2' sx={{ mt: 2, mb: 1 }}>
              友善標籤
            </Typography>
            <Stack
              direction='row'
              spacing={1}
              useFlexGap
              sx={{ alignItems: 'center', flexWrap: 'wrap' }}
            >
              {loading &&
                Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant='rounded'
                    width={80}
                    height={32}
                    sx={{ borderRadius: 16 }}
                  />
                ))}
              {friendlyTypeTags?.map(id => (
                <Chip
                  key={id}
                  label={tag.find(t => t.id === id)?.name}
                  variant='outlined'
                />
              ))}
            </Stack>
          </>
        ) : (
          <Typography variant='h6'>Place not found</Typography>
        )}
      </Box>
    </Container>
  )
}

export default PlacePage
