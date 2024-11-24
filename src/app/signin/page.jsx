'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Sign-in failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.accessToken);

      console.log('Sign-in successful', data);
      router.push('/');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to sign in, please check your credentials.');
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start px-6 sm:px-12 md:px-16 lg:px-20 py-8 lg:py-0">
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black mb-4 flex items-center">
          Welcome <span className="ml-2">👋</span>
        </p>
        <p className="text-base sm:text-lg font-normal text-gray-500 mb-6 sm:mb-8 lg:mb-10">
          Please Sign-In here
        </p>
        <form className="flex flex-col w-full space-y-4 sm:space-y-5 lg:space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border border-gray-300 rounded-lg py-2 sm:py-3 px-4 text-base sm:text-lg w-full focus:outline-none focus:border-black"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border border-gray-300 rounded-lg py-2 sm:py-3 px-4 text-base sm:text-lg w-full focus:outline-none focus:border-black"
            required
          />
          <div className="flex justify-between items-center w-full mt-4 sm:mt-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-black"
              />
              <span className="text-xs sm:text-sm font-normal text-gray-500">
                Remember Me
              </span>
            </label>
            <a href="#" className="text-xs sm:text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="mt-6 sm:mt-8 w-full py-2 sm:py-3 bg-black text-white text-lg rounded-lg hover:bg-gray-800 transition-all"
          >
            Sign In
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
        <p className="mt-4 sm:mt-6 text-center w-full text-xs sm:text-sm">
          Not Registered Yet?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
