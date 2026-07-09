'use client'

import type { PlaceBrief } from '@/domain/place/schema'
import useTagStore from '@/domain/tag/store'
import {
  alpha,
  Card,
  CardContent,
  CardHeader,
  CardHeaderProps,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'

type PlaceCardProps = {
  place: PlaceBrief
  action?: CardHeaderProps['action']
  selected?: boolean
}

const PlaceCardSkeleton: React.FC = () => {
  return (
    <Card variant='outlined'>
      <CardHeader
        title={<Skeleton variant='text' width={120} animation='wave' />}
        subheader={<Skeleton variant='text' width={200} animation='wave' />}
        slotProps={{
          title: {
            variant: 'subtitle1',
          },
          subheader: {
            variant: 'body2',
            color: 'textSecondary',
          },
        }}
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant='body2' gutterBottom>
          <Skeleton variant='text' width='50%' animation='wave' />
        </Typography>
        <Typography variant='body2' gutterBottom>
          <Skeleton variant='text' animation='wave' />
        </Typography>
        <Typography variant='body2'>
          <Skeleton variant='text' animation='wave' />
        </Typography>
      </CardContent>
    </Card>
  )
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, action, selected }) => {
  const category = useTagStore(s => s.category)
  const tag = useTagStore(s => s.tag)

  const storeTypeTags = place.tagIds.filter(id => {
    const tagItem = tag.find(t => t.id === id)
    return (
      tagItem &&
      tagItem.categoryId === category.find(c => c.name === '餐廳類型')?.id
    )
  })

  const friendlyTypeTags = place.tagIds.filter(id => {
    const tagItem = tag.find(t => t.id === id)
    return (
      tagItem &&
      tagItem.categoryId === category.find(c => c.name === '友善標籤')?.id
    )
  })

  return (
    <Card
      variant='outlined'
      sx={{
        ...(selected && {
          borderColor: 'primary.main',
          bgcolor: theme => alpha(theme.palette.primary.light, 0.08),
        }),
      }}
    >
      <CardHeader
        title={place.name}
        subheader={place.address}
        action={action}
        slotProps={{
          title: {
            variant: 'subtitle1',
          },
          subheader: {
            variant: 'body2',
            color: 'textSecondary',
          },
          action: {
            onClick: e => {
              e.preventDefault()
              e.stopPropagation()
            },
          },
        }}
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant='body2' gutterBottom>
          評分：{place.score} / 5
        </Typography>
        {!!storeTypeTags.length && (
          <Typography
            variant='body2'
            gutterBottom
            component={Stack}
            direction='row'
            spacing={1}
            useFlexGap
            sx={{ alignItems: 'center', flexWrap: 'wrap' }}
          >
            餐廳類型：{' '}
            {storeTypeTags.map(id => (
              <Chip
                key={id}
                label={tag.find(t => t.id === id)?.name}
                size='small'
              />
            ))}
          </Typography>
        )}

        {!!friendlyTypeTags.length && (
          <Typography
            variant='body2'
            component={Stack}
            direction='row'
            spacing={1}
            useFlexGap
            sx={{ alignItems: 'center', flexWrap: 'wrap' }}
          >
            友善標籤：{' '}
            {friendlyTypeTags.map(id => (
              <Chip
                key={id}
                label={tag.find(t => t.id === id)?.name}
                size='small'
              />
            ))}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default PlaceCard
export { PlaceCardSkeleton }
