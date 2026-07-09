'use client'

import { Fab } from '@mui/material'
import KeyDialog from './KeyDialog'
import { useState } from 'react'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

const KeyInject: React.FC = () => {
  const [open, setOpen] = useState(false)

  const handleFabClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Fab
        onClick={handleFabClick}
        size='small'
        color='default'
        sx={{
          borderColor: 'primary.main',
          borderWidth: 1,
          borderStyle: 'solid',
          bgcolor: 'background.paper',
          '&:hover': {
            bgcolor: 'background.paper',
          },
        }}
      >
        <SettingsRoundedIcon color='primary' />
      </Fab>
      <KeyDialog open={open} onClose={handleClose} />
    </>
  )
}

export default KeyInject

export { default as KeyDialog } from './KeyDialog'
