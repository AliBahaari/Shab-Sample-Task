'use client'

import { useContext } from 'react'
import { Typography, Button, Box, Paper } from '@mui/material'
import { Delete, Check } from '@mui/icons-material'
import { ThemeContext } from './Layout'
import { Item, useStore } from '@/store'
import { toast } from 'react-toastify'
import { toastConfiguration } from '@/utils/toastConfiguration'

type ItemsProps = {
  item: Item
}

export default function Items({ item }: ItemsProps) {
  const darkMode = useContext(ThemeContext)
  const { completeItem, removeItem } = useStore()

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        my: 2,
        p: 2,
        backgroundColor: `${darkMode && 'rgb(52, 61, 72)'}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
          }}
        >
          <Typography variant='body1' display='inline-block'>
            {item?.text}
          </Typography>
          <Typography variant='caption' display='inline-block'>
            {item?.type}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
          }}
        >
          <Button
            disabled={item?.isCompleted}
            variant='text'
            onClick={() => {
              completeItem(item?.id)
              toast.success('Marked Completed Successfully!', toastConfiguration)
            }}
            startIcon={<Check />}
            color='success'
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            Completed
          </Button>
          <Button
            variant='text'
            onClick={() => {
              removeItem(item?.id)
              toast.success('Removed Successfully!', toastConfiguration)
            }}
            color='error'
            startIcon={<Delete />}
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
