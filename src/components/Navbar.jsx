import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Box } from '@mui/material'

export default function Navbar() {
  return (
    <AppBar position="static" className="bg-white shadow">
      <Toolbar className="justify-between">
        <Box className="flex items-center space-x-4">
          <Link to="/" className="text-gray-900 hover:text-gray-700">
            Home
          </Link>
          <Link to="/about" className="text-gray-900 hover:text-gray-700">
            About
          </Link>
        </Box>
        <Box className="flex items-center space-x-4">
          <Button
            component={Link}
            to="/login"
            color="inherit"
            className="text-gray-900 hover:text-gray-700"
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
} 