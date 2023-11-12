import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const DetailPage = ({ title, disabled }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user: {
        username: '',
        password: '',
      },
    role: '',
    bio: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       if (formData.user.password !== formData.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      if (title === 'LOGIN') {
        await axios.post('http://127.0.0.1:8000/login/', formData);
        router.push('/dashboard',formData)
      } else if (title === 'SIGN UP') {
        await axios.post('http://127.0.0.1:8000/signup/', formData);
        router.push('/login')
      }
    } catch (error) {
      console.error(`${title} failed:`, error);
    }
  };

  return (
    <div className='signUp'>
      <h1>{title}</h1>
      <div className='signUpSect'>
        <label>Name:</label>
        <input
          type='text'
          name='username'
          placeholder='Enter your username'
          value={formData.username || ''}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type='password'
          name='password'
          placeholder='Enter password'
          value={formData.password || ''}
          onChange={handleChange}
        />
        {!disabled ? (
          <>
            <label> Confirm Password:</label>
            <input
              type='password'
              name='confirmPass'
              placeholder='Enter password'
              value={formData.confirmPass ||''}
              onChange={handleChange}
              />
         
            <label>Bio:</label>
            <input
              type='text'
              name='bio'
              placeholder='Enter your bio'
              value={formData.bio ||''}
              onChange={handleChange}
            />
            </>

        ):('')}

        <p>
          Entering your details you consent to{' '}
          <strong>Terms and Conditions</strong> as well as the{' '}
          <strong>Privacy Policy</strong>
        </p>
        {!disabled ? (
          <p>
            Already have an account?{' '}
            <Link href='/login'>
              <strong style={{ cursor: 'pointer', color: 'blue' }}>Login</strong>
            </Link>
          </p>
        ) : (
          ''
        )}

        <button onClick={handleSubmit}>{title}</button>
      </div>
    </div>
  );
};

export default DetailPage;