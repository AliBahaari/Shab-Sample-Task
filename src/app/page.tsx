'use client'

import { useContext, useLayoutEffect, useMemo, useState } from 'react'
import { Paper, Typography } from '@mui/material'
import Toolbar from '@/components/Toolbar'
import Item from '@/components/Item'
import { ThemeContext } from '@/components/Layout'
import { useStore } from '@/store'
import { LocalStorage } from '@/middlewares/localStorage'

export default function Home() {
  const darkMode = useContext(ThemeContext)
  const [filter, setFilter] = useState<number>(1)
  const { items, initializeItems } = useStore()

  useLayoutEffect(() => {
    initializeItems(LocalStorage.Read())
  }, [initializeItems])

  const filteredItems = useMemo(() => {
    switch (filter) {
      case 1:
        return items
      case 2:
        return items.filter((item) => item.isCompleted === false)
      case 3:
        return items.filter((item) => item.isCompleted === true)
      default:
        return items
    }
  }, [filter, items])

  return (
    <Paper
      elevation={darkMode ? 0 : 1}
      sx={{
        width: { md: 2 / 3 },
        mx: { xs: 3, md: 'auto' },
        p: { xs: 2, sm: 4 },
        borderRadius: 4,
        backgroundColor: `${darkMode ? 'rgb(33, 43, 53)' : '#FFF'}`,
      }}
    >
      <Toolbar filter={filter} setFilter={(filter) => setFilter(filter)} />

      {!!filteredItems?.length ? (
        filteredItems?.map((item, index) => <Item key={index} item={item} />)
      ) : (
        <Typography variant='caption' textAlign={'center'} mt={4} display={'block'}>
          No Item Found
        </Typography>
      )}
    </Paper>
  )
}
