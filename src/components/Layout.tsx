'use client'

import { createContext, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { Contrast } from '@mui/icons-material'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#fafafa',
      paper: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: 'Inter',
  },
})

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#161B25',
      paper: '#161b25',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255,255,255,0.12)',
    action: {
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabled: 'rgba(255, 255, 255, 0.3)',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'rgba(255, 255, 255, 0.23)',
          fill: 'rgb(255, 255, 255)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'rgb(255, 255, 255)',
          fill: '#FFF',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          fill: '#FFF',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Inter',
  },
})

export const ThemeContext = createContext(false)

function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <ThemeContext.Provider value={darkMode}>
          <ToastContainer />

          <Box
            style={{
              backgroundColor: `${darkMode ? '#161B25' : '#FFF'}`,
              minHeight: '100vh',
              padding: '40px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton
                onClick={() => setDarkMode((previousState) => !previousState)}
                sx={{ p: '10px' }}
              >
                <Contrast />
              </IconButton>
            </Box>

            <Box
              sx={{
                mt: 4,
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  )
}

export default Layout
