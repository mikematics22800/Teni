import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../firebase/auth';
import { createUserDocument } from '../firebase/firestore';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import travel from '../assets/travel.png';
import VideoBackground from '../components/VideoBackground';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [inputType, setInputType] = useState('password');

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!hasNumbers) {
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    return null;
  };

  const toggleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

    // Form validation
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError('Please fill in all fields');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const userCredential = await register(formData.email, formData.password);
      
      // Create user document in Firestore
      await createUserDocument(userCredential.user, {
        name: `${formData.firstName}${formData.lastName}`,
        displayName: `${formData.firstName} ${formData.lastName}`,
        createdAt: new Date(),
      });

      navigate(`/${userCredential.user.uid}`);
    } catch (error) {
      console.log(error)
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/operation-not-allowed':
          setError('Registration is currently disabled');
          break;
        case 'auth/weak-password':
          setError('Password is too weak');
          break;
        default:
          setError('Failed to create account. Please try again.');
      }
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <VideoBackground />
      <form className='w-96 p-8 gap-4 flex flex-col items-center bg-black/50 shadow-lg rounded-3xl' onSubmit={handleSubmit}>
        <h1 className='text-4xl font-bold italic  text-white text-center'>Teni</h1>
        <h1 className='text-lg text-center font-bold  text-white'>Your personal journey navigator and companion. </h1>
        {error && (
          <div className='w-full p-2 text-sm text-red-600 bg-red-100 rounded-md justify-center flex'>
            {error}
          </div>
        )}
        <div className='flex gap-2'>
          <input
            name='firstName'
            className='w-full p-2 rounded-md bg-white'
            type="text"
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            name='lastName'
            className='w-full p-2 rounded-md bg-white'
            type="text"
            placeholder='Last Name'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input 
          name='email' 
          className='w-full p-2 rounded-md bg-white' 
          type="email" 
          placeholder='Email' 
          value={formData.email} 
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <div className='relative w-full'>
          <input 
            name='password' 
            className='w-full p-2 rounded-md bg-white' 
            type={inputType} 
            placeholder='Password' 
            value={formData.password} 
            onChange={handleChange}
            required
            autoComplete="new-password"
            minLength={8}
            title="Password must contain at least 8 characters containing letters, numbers, and special characters."
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          />
          <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'>
            {inputType === 'password' ? <VisibilityOff className='w-5 h-5' onClick={toggleInputType}/> : <Visibility className='w-5 h-5' onClick={toggleInputType}/>}
          </button>
        </div>
        <button type='submit' className='w-full p-2 rounded-md bg-blue-600 font-bold text-white font cursor-pointer hover:bg-blue-600 transition-colors'>Register</button>
        <Link to="/login" className='text-white font-bold bg-blue-600 rounded-3xl p-2 text-xs'>Already have account?</Link>
        </form>
    </div>
  );
}