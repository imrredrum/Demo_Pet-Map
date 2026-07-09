import { Fab } from '@mui/material'
import ApiDialog from './KeyDialog'
import { useState } from 'react'

const KeyInject: React.FC = () => {
  const [open, setOpen] = useState(true)

  const handleFabClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Fab onClick={handleFabClick}></Fab>
      <ApiDialog open={open} onClose={handleClose} />
    </>
  )
}

export default KeyInject

export { default as KeyDialog } from './KeyDialog'
