import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, loginWithGoogle } from '../firebase/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import travel from '../assets/travel.png';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
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
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const userCredential = await login(formData.email, formData.password);
      navigate(`/${userCredential.user.uid}`);
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later');
          break;
        default:
          setError('Failed to login. Please try again.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const result = await loginWithGoogle();
      navigate(`/${result.user.uid}`);
    } catch (error) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Login cancelled');
          break;
        case 'auth/popup-blocked':
          setError('Popup was blocked. Please allow popups for this site');
          break;
        case 'auth/cancelled-popup-request':
          setError('Login cancelled');
          break;
        case 'auth/account-exists-with-different-credential':
          setError('An account already exists with this email using a different sign-in method');
          break;
        default:
          setError('Failed to login with Google. Please try again.');
      }
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <form className='w-96 p-8 gap-4 flex flex-col items-center bg-gray-200 shadow-lg rounded-3xl' onSubmit={handleSubmit}>
        <img src={travel} alt="travel" className='w-20' />
        <h1 className='text-2xl font-bold italic'>Teni</h1>
        {error && (
          <div className='w-full p-2 text-sm text-red-600 bg-red-100 rounded-md justify-center flex'>
            {error}
          </div>
        )}
        <input 
          className='w-full p-2 rounded-md bg-white' 
          type="email" 
          name="email" 
          placeholder='Email' 
          value={formData.email} 
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <div className='relative w-full'>
          <input 
            className='w-full p-2 rounded-md bg-white' 
            type={inputType} 
            name="password" 
            placeholder='Password' 
            value={formData.password} 
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'>
            {inputType === 'password' ? <VisibilityOff className='w-5 h-5' onClick={toggleInputType}/> : <Visibility className='w-5 h-5' onClick={toggleInputType}/>}
          </button>
        </div>
        <button type='submit' className='w-full p-2 rounded-md bg-blue-500 text-white font cursor-pointer hover:bg-blue-600 transition-colors'>Login</button>
        <button 
          type='button' 
          className='w-full p-2 rounded-md bg-white flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors' 
          onClick={handleGoogleLogin}
        >
          Login with&nbsp;
          <p className='text-[#4285F4] font-bold'>G</p>
          <p className='text-[#DB4437] font-bold'>o</p>
          <p className='text-[#F4B400] font-bold'>o</p>
          <p className='text-[#0F9D58] font-bold'>g</p>
          <p className='text-[#4285F4] font-bold'>l</p>
          <p className='text-[#DB4437] font-bold'>e</p>
        </button>
        <p>Forgot password? <Link to="/reset" className='text-blue-500 font-bold hover:text-blue-600 transition-colors'>Reset password</Link></p>
        <p>Don't have an account? <Link to="/register" className='text-blue-500 font-bold hover:text-blue-600 transition-colors'>Register</Link></p>
      </form>
    </div>
  );
}