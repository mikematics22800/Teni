import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../firebase/auth';
import VideoBackground from '../components/VideoBackground';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Register() {
  const [inputType, setInputType] = useState('password');

  const toggleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    register(formData.email, formData.password);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <VideoBackground/>
      <form className='w-96 p-8 gap-8 flex flex-col items-center bg-white shadow-lg rounded-3xl' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-bold italic'>TheeItinerary</h1>
        <input name='email' className='w-full p-2 rounded-md border-[1px] border-gray-400' type="email" placeholder='Email' value={formData.email} onChange={handleChange}/>
        <div className='relative w-full'>
          <input name='password' className='w-full p-2 rounded-md border-[1px] border-gray-400' type={inputType} placeholder='Password' value={formData.password} onChange={handleChange}/>
          <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'>
            {inputType === 'password' ? <VisibilityOff className='w-5 h-5' onClick={toggleInputType}/> : <Visibility className='w-5 h-5' onClick={toggleInputType}/>}
          </button>
        </div>        <button type='submit' className='w-full p-2 rounded-md bg-blue-500 text-white'>Register</button>
        <p>Already have an account? <Link to="/login" className='text-blue-500'>Login</Link></p>
      </form>
    </div>
  );
}