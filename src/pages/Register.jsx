import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../firebase/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import travel from '../assets/travel.png';

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
    if (!formData.email || !formData.password || !formData.confirmPassword) {
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
      navigate(`/${userCredential.user.uid}`);
    } catch (error) {
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
      <form className='w-96 p-8 gap-4 flex flex-col items-center bg-gray-200 shadow-lg rounded-3xl' onSubmit={handleSubmit}>
        <img src={travel} alt="travel" className='w-20' />
        <h1 className='text-2xl font-bold italic'>Teni</h1>
        {error && (
          <div className='w-full p-2 text-sm text-red-600 bg-red-100 rounded-md justify-center flex'>
            {error}
          </div>
        )}
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
          />
          <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'>
            {inputType === 'password' ? <VisibilityOff className='w-5 h-5' onClick={toggleInputType}/> : <Visibility className='w-5 h-5' onClick={toggleInputType}/>}
          </button>
        </div>
        <div className='w-full text-xs text-gray-600'>
          Password must contain:
          <ul className='list-disc list-inside'>
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character</li>
          </ul>
        </div>
        <button type='submit' className='w-full p-2 rounded-md bg-blue-500 text-white font cursor-pointer hover:bg-blue-600 transition-colors'>Register</button>
        <p>Already have an account? <Link to="/login" className='text-blue-500 font-bold hover:text-blue-600 transition-colors'>Login</Link></p>
      </form>
    </div>
  );
}