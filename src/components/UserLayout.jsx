import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  )
}

export default UserLayout 