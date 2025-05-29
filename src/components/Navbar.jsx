import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }
  return (
    <nav className='flex justify-between items-center fixed top-0 left-0 z-50 bg-gray-900 w-screen h-20 px-10'>
      <div className="flex items-center space-x-4">
        <Link to="." className='text-white hover:text-gray-300'>Home</Link>
        <Link to="flights" className='text-white hover:text-gray-300'>Flights</Link>
        <Link to="hotels" className='text-white hover:text-gray-300'>Hotels</Link>
        <Link to="restaurants" className='text-white hover:text-gray-300'>Restaurants</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="support" className='text-white hover:text-gray-300'>Support</Link>
        <button 
          className='bg-white text-gray-900 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100' 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
} 