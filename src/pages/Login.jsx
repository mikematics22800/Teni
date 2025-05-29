import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../firebase/auth';
import VideoBackground from '../components/VideoBackground';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
  const [inputType, setInputType] = useState('password');

  const toggleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password)
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <VideoBackground/>
      <form className='w-96 p-8 gap-8 flex flex-col items-center bg-white shadow-lg rounded-3xl' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-bold italic'>TheeItinerary</h1>
        <input className='w-full p-2 rounded-md border-[1px] border-gray-400' type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange}/>
        <div className='relative w-full'>
          <input className='w-full p-2 rounded-md border-[1px] border-gray-400' type={inputType} name="password" placeholder='Password' value={formData.password} onChange={handleChange}/>
          <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'>
            {inputType === 'password' ? <VisibilityOff className='w-5 h-5' onClick={toggleInputType}/> : <Visibility className='w-5 h-5' onClick={toggleInputType}/>}
          </button>
        </div>
        <button type='submit' className='w-full p-2 rounded-md bg-blue-500 text-white'>Login</button>
        <p>Don't have an account? <Link to="/register" className='text-blue-500'>Register</Link></p>
      </form>
    </div>
  );
}