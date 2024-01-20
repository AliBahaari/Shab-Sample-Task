'use client'

import { useState, useContext } from 'react'
import {
  Button,
  Collapse,
  TextField,
  Select,
  MenuItem,
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  Menu,
  Fade,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { ThemeContext } from './Layout'
import { useStore } from '@/store'
import { toast } from 'react-toastify'
import { toastConfiguration } from '@/utils/toastConfiguration'

type ToolbarProps = {
  setFilter: (filter: number) => void
  filter: number
}

type ItemType = 'High' | 'Medium' | 'Low'
const menuItems = ['High', 'Medium', 'Low']
const filters = ['None', 'Active', 'Completed']

export default function Toolbar({ setFilter, filter }: ToolbarProps) {
  const darkMode = useContext(ThemeContext)
  const { items, addItem, removeAllCompleteds } = useStore()

  const [openForm, setOpenForm] = useState<boolean>(false)
  const [itemType, setItemType] = useState<ItemType>('High')
  const [itemText, setItemText] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleCreate = () => {
    if (!itemText?.length) {
      toast.error('Empty Fields!', toastConfiguration)
      return
    }
    if (itemText?.length > 50) {
      toast.error('Max Character Is 50!', toastConfiguration)
      return
    }

    addItem({
      id: Math.random() * 100,
      type: itemType,
      text: itemText,
      isCompleted: false,
    })
    setItemText('')
    toast.success('Created Successfully!', toastConfiguration)
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, my: 2 }}>
        <Box>
          <Button
            color='success'
            disabled={openForm}
            variant='text'
            onClick={() => setOpenForm(true)}
          >
            Create
          </Button>

          <Button
            sx={{ ml: 2 }}
            disabled={items?.filter((item) => item.isCompleted === true).length === 0}
            color='error'
            variant='text'
            onClick={() => {
              removeAllCompleteds()
              toast.success('Removed All Completeds Successfully!', toastConfiguration)
            }}
          >
            Remove All Completed
          </Button>
        </Box>

        <Button
          color='info'
          disabled={items?.length === 0}
          onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
        >
          {filter === 1 ? 'None' : filter === 2 ? 'Active' : filter === 3 ? 'Completed' : ''}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          TransitionComponent={Fade}
        >
          {filters?.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                setAnchorEl(null)
                setFilter(index + 1)
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Collapse in={openForm}>
        <Card
          sx={{
            p: 2,
            borderRadius: 4,
            backgroundColor: `${darkMode && 'rgb(52, 61, 72)'}`,
            backgroundImage: `${
              darkMode && 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'
            }`,
          }}
          elevation={0}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={itemType}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                    label='نوع'
                    onChange={(event: SelectChangeEvent) =>
                      setItemType(event.target.value as ItemType)
                    }
                  >
                    {menuItems?.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item}
                        sx={{
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <span>{item}</span>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label={'Text'}
                  value={itemText}
                  onChange={(event) => setItemText(event.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardActions
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 1,
            }}
          >
            <Button
              size='small'
              variant='outlined'
              color='warning'
              onClick={() => setOpenForm(false)}
            >
              Cancel
            </Button>

            <Button size='small' variant='outlined' color='success' onClick={handleCreate}>
              Create
            </Button>
          </CardActions>
        </Card>
      </Collapse>
    </>
  )
}
