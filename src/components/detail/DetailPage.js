import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const DetailPage = ({ title, disabled }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
      username: '',
      password: '',
      email:'',
      confirm_password:''
  });
  // console.log(formData)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      

      if (title === 'LOGIN') {
        const response = await axios.post('http://127.0.0.1:8000/login/', formData);
        if(response.data.message === 'Login successful'){
          localStorage.setItem('user', JSON.stringify(response.data.user))
          router.push(`/dashboard/${response.data.user.username}`)

        }

      } else if (title === 'SIGN UP') {
        if (formData.password !== formData.confirm_password) {
          console.error('Passwords do not match');
          return;
        }
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
        {!disabled ? (
          <>
            <label>Email:</label>
            <input
              type='email'
              name='email'
              placeholder='Enter your Email address'
              value={formData.email || ''}
              onChange={handleChange}
            />
          </>
        ) : ('')}
        
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
             <label>Confirm Password:</label>
            <input
              type='password'
              name='confirm_password'
              placeholder='Enter password'
              value={formData.confirm_password || ''}
              onChange={handleChange}
            />
          </>
        ) : ('')}

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

        <button type='button' onClick={handleSubmit}>{title}</button>
      </div>
    </div>
  );
};

export default DetailPage;