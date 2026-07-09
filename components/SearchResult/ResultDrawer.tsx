'use client'

import { SwipeableDrawer, SwipeableDrawerProps } from '@mui/material'

const ResultDrawer: React.FC<SwipeableDrawerProps> = ({
  open,
  onClose,
  onOpen,
  children,
  ...rest
}) => {
  return (
    <SwipeableDrawer
      anchor='left'
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      slotProps={{
        paper: {
          sx: {
            width: 'calc(100dvw - 88px)',
            maxWidth: 'sm',
          },
        },
      }}
      {...rest}
    >
      {children}
    </SwipeableDrawer>
  )
}

export default ResultDrawer
