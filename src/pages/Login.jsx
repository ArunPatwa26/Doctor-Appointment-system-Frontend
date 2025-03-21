import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate =useNavigate()

  const {backendUrl,token,setToken}=useContext(AppContext)
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      
      if(state === 'Sign Up'){
      const {data}=await axios.post(backendUrl + '/api/user/register',{name,password,email})
      if(data.success){
        localStorage.setItem('token',data.token)
        setToken(data.token)
      }else{
        toast.error(data.message)
      }

      }else{
        const {data}=await axios.post(backendUrl + '/api/user/login',{password,email})
      if(data.success){
        localStorage.setItem('doctor-token',data.token)
        setToken(data.token)
      }else{
        toast.error(data.message)
      }
      }
    } catch (error) {
      toast.error(error.message)
    }
    // Add your form submission logic here
    // console.log({ name, email, password });
  };
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md p-6 bg-white shadow-md rounded-md"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please {state === 'Sign Up' ? 'Sign up' : 'log in'} to book an appointment
        </p>

        {/* Full Name */}
        {state === 'Sign Up' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Email ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email ID</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>
          {
            state ==="Sign Up"
            ? <p>Already have an account <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            : <p>Create an new account <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
          }
        </div>

        {/* Toggle between Sign Up and Login */}
        
      </form>
    </div>
  );
};

export default Login;
