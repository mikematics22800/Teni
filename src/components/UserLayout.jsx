import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  )
}

export default UserLayout 