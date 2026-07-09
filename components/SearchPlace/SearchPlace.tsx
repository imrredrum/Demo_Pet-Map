'use client'

import { useEffect, useState } from 'react'
import {
  Autocomplete,
  inputBaseClasses,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { useDebounce } from 'use-debounce'
import { getPlaceLocation, searchPlaces } from '@/domain/search/apis'
import { updateCenter } from '@/domain/map/store'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import type { PlaceSuggestion } from '@/domain/search/schema'
import useKeyStore from '@/domain/key/store'

const SearchPlace: React.FC = () => {
  const [keyword, setKeyword] = useState('')
  const [debouncedKeyword] = useDebounce(keyword, 300)
  const [options, setOptions] = useState<PlaceSuggestion[]>([])
  const key = useKeyStore(s => s.key)

  useEffect(() => {
    if (!key || !debouncedKeyword) return

    const controller = new AbortController()

    searchPlaces(debouncedKeyword, key, controller.signal)
      .then(setOptions)
      .catch(() => {})

    return () => controller.abort()
  }, [debouncedKeyword, key])

  const handleInputChange = (_event: React.SyntheticEvent, value: string) => {
    setKeyword(value)
  }

  const handleChange = async (
    _event: React.SyntheticEvent,
    value: PlaceSuggestion | null,
  ) => {
    if (!key || !value) return
    const location = await getPlaceLocation(value.id, key)
    updateCenter(location)
  }

  return (
    <Autocomplete
      size='small'
      options={options}
      getOptionLabel={o => o.primaryText}
      filterOptions={x => x}
      inputValue={keyword}
      onInputChange={handleInputChange}
      onChange={handleChange}
      renderInput={params => (
        <TextField
          {...params}
          label='搜尋地點'
          sx={{
            [`.${inputBaseClasses.root}`]: { bgcolor: 'background.paper' },
          }}
        />
      )}
      getOptionKey={o => o.id}
      renderOption={(props, option) => (
        <ListItem
          {...props}
          key={props.key}
          sx={{
            py: 1,
            alignItems: 'flex-start',
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, mt: 0.25 }}>
            <LocationOnOutlinedIcon fontSize='small' color='action' />
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography variant='body2' sx={{ fontWeight: 500 }}>
                {option.primaryText}
              </Typography>
            }
            secondary={
              option.secondaryText && (
                <Typography variant='caption' color='text.secondary'>
                  {option.secondaryText}
                </Typography>
              )
            }
          />
        </ListItem>
      )}
    />
  )
}

export default SearchPlace
