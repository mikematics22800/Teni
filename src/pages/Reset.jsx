import React, { useState } from 'react'
import { resetPassword } from '../firebase/auth'
import travel from '../assets/travel.png';
import { useNavigate } from 'react-router-dom';

export default function Reset() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email); 
      setSuccess('Password reset email sent');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
    setSuccess('');
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form className='w-md bg-gray-200 rounded-lg shadow-lg p-8 gap-4 flex flex-col items-center' onSubmit={handleReset}>   
        <img src={travel} alt="travel" className='w-20' />
        <h1 className='text-2xl font-bold'>Reset Password</h1>
        <p className='text-sm text-gray-600 text-center'>Enter your email and we will send you a password reset link</p>
        <input type='email' placeholder='Email' value={email} onChange={handleChange} className='w-full p-2 rounded-md bg-white' />
        <button type='submit' className='w-full p-2 rounded-md bg-blue-500 text-white font cursor-pointer hover:bg-blue-600 transition-colors'>Submit</button>
        {error && (
          <div className='w-full p-2 text-sm text-red-600 bg-red-100 rounded-md justify-center flex'>
            {error}
          </div>
        )}
        {success && (
          <div className='w-full p-2 text-sm text-green-600 bg-green-100 rounded-md justify-center flex'>
            {success}
          </div>
        )}
        <button type='button' className='w-full p-2 rounded-md bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors' onClick={() => navigate('/login')}>Back to Login</button>
      </form>
    </div>
  )
}