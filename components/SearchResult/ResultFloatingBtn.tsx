'use client'

import useResultStore from '@/domain/results/store'
import ListRoundedIcon from '@mui/icons-material/ListRounded'
import { Badge, CircularProgress, Fab, type FabProps } from '@mui/material'

const ResultFloatingBtn: React.FC<FabProps> = props => {
  const loading = useResultStore(s => s.loading)
  const size = useResultStore(s => s.result.length)

  return (
    <Fab size='small' color='primary' {...props}>
      <Badge color='error' badgeContent={size} invisible={!size || loading}>
        {loading ? (
          <CircularProgress color='inherit' size={16} />
        ) : (
          <ListRoundedIcon />
        )}
      </Badge>
    </Fab>
  )
}

export default ResultFloatingBtn
