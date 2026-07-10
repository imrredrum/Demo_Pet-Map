'use client'

import { useEffect, useState } from 'react'
import ResultDrawer from './ResultDrawer'
import ResultFloatingBtn from './ResultFloatingBtn'
import ResultList from './ResultList'
import useResultStore, { resetResultStore } from '@/domain/results/store'
import { resetCenter } from '@/domain/map/store'

const SearchResult: React.FC = () => {
  const focusedResult = useResultStore(s => s.focusedResult)
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!focusedResult) return
    const timer = setTimeout(() => setOpen(true), 0)
    return () => clearTimeout(timer)
  }, [focusedResult])

  useEffect(() => {
    return () => {
      resetCenter()
      resetResultStore()
    }
  }, [])

  return (
    <>
      <ResultFloatingBtn onClick={handleDrawerOpen} />
      <ResultDrawer
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <ResultList />
      </ResultDrawer>
    </>
  )
}

export default SearchResult
