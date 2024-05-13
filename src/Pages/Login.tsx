import React, { useEffect, useState } from 'react'
import { checkLoginStatus, loginUser } from '../state/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const {loading, isLoggedIn, user, error} = useSelector(state => state.user)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(()=>{
    dispatch(checkLoginStatus())
  },[dispatch])

  const handleSubmit =  (e) => {
    e.preventDefault()
    dispatch(loginUser(formData))
  }


  if(loading){
    return(
      <h1>Loading ...</h1>
    )
  }
  if(isLoggedIn){
    return(
      <Navigate replace to="/dashboard" />
    )
  }else{ 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Sign in
          </button>
        </div>
      </form>
      {error ? error : ''}
    </div>
  </div>
  )
}
}

export default Login
