import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';

const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('')

  const { userName, login, Signup } = useAuth()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    login(email, password)
    navigate('/')
  }

  const handleSignup = (e) => {
    e.preventDefault();

    Signup(email, password, name)
    navigate('/')
  }
  useEffect(() => {
    if (userName) {
      navigate('/');
    }
  }, [userName, navigate]);
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={mode == 'login' ? handleLogin : handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {
            mode != "login" ?
              <input
                type="test"
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              /> : null
          }
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {mode === 'login' ? 'New here?' : 'Already have an account?'}{' '}
          <span
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-blue-500 cursor-pointer font-medium"
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
