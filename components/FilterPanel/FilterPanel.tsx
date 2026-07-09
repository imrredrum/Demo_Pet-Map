'use client'

import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import useTagStore from '@/domain/tag/store'
import { useMemo } from 'react'
import { Tag } from '@/domain/tag/schema'
import useFilterStore, {
  updateFriendlyFilter,
  updateStoreFilter,
} from '@/domain/filter/store'

const FilterPanel: React.FC = () => {
  const category = useTagStore(s => s.category)
  const tag = useTagStore(s => s.tag)

  const tagsByType = useMemo(() => {
    const storeTypeId = category.find(c => c.name === '餐廳類型')?.id
    const friendlyTypeId = category.find(c => c.name === '友善標籤')?.id
    return {
      store: tag.filter(t => t.categoryId === storeTypeId),
      friendly: tag.filter(t => t.categoryId === friendlyTypeId),
    }
  }, [tag, category])

  const selectedStoreTags = useFilterStore(s => s.storeTags)
  const selectedFriendlyTags = useFilterStore(s => s.friendlyTags)

  return (
    <Stack direction='row' spacing={1.5} sx={{ mt: 1.5 }}>
      <FormControl fullWidth size='small'>
        <InputLabel id='-store-type-label'>餐廳類型</InputLabel>
        <Select<Tag['id'][]>
          labelId='-store-type-label'
          id='-store-type'
          label='餐廳類型'
          multiple
          value={selectedStoreTags}
          onChange={e => {
            const value = e.target.value
            updateStoreFilter(
              typeof value === 'string' ? value.split(',').map(Number) : value,
            )
          }}
          inputProps={{
            sx: {
              bgcolor: 'background.paper',
            },
          }}
        >
          {tagsByType.store.map(t => (
            <MenuItem key={t.id} value={t.id}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size='small'>
        <InputLabel id='-friendly-label'>友善標籤</InputLabel>
        <Select<Tag['id'][]>
          labelId='-friendly-label'
          id='-friendly'
          label='友善標籤'
          multiple
          value={selectedFriendlyTags}
          onChange={e => {
            const value = e.target.value
            updateFriendlyFilter(
              typeof value === 'string' ? value.split(',').map(Number) : value,
            )
          }}
          inputProps={{
            sx: {
              bgcolor: 'background.paper',
            },
          }}
        >
          {tagsByType.friendly.map(t => (
            <MenuItem key={t.id} value={t.id}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default FilterPanel
