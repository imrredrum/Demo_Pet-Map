'use client'

import useKeyStore, { setKey } from '@/domain/key/store'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Link,
  Stack,
  TextField,
} from '@mui/material'
import KeyRoundedIcon from '@mui/icons-material/KeyRounded'
import { useState } from 'react'

const KeyDialog: React.FC<DialogProps> = dialogProps => {
  const { open, onClose, ...rest } = dialogProps
  const [input, setInput] = useState('')
  const key = useKeyStore(s => s.key)

  const handleClose = () => {
    if (!key) return
    onClose?.({}, 'backdropClick')
  }

  const handleDiscard = () => {
    handleClose()
  }

  const handleSubmit = () => {
    setKey(input)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} {...rest}>
      <DialogTitle>Inset your own Google Maps JavaScript API key</DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Stack spacing={1.5}>
          <DialogContentText>
            Please follow the instructions in the link below to get your own
            Google Maps JavaScript API key and insert it here.
            <br />
            <Link
              href='https://developers.google.com/maps/documentation/javascript/get-api-key?hl=zh-tw#get-a-standard-api-key'
              target='_blank'
              rel='noopener'
            >
              https://developers.google.com/maps/documentation/javascript/get-api-key
            </Link>
          </DialogContentText>
          <TextField
            label='API Key'
            fullWidth
            value={input}
            onChange={e => setInput(e.target.value)}
            slotProps={{
              input: {
                startAdornment: <KeyRoundedIcon />,
                autoComplete: 'off',
              },
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 2 }}>
        {onClose && <Button onClick={handleDiscard}>Discard</Button>}
        <Button onClick={handleSubmit} disabled={!input}>
          {key ? 'Update' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default KeyDialog
