import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', email: '', fullName: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await register(form)
      loginUser({ username: res.data.username, fullName: res.data.fullName }, res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-gray-200 rounded-lg p-10 w-[420px]">
        <div className="bg-white rounded-md p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Registration</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-sm text-black-700 mb-1">Username:</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-2 py-2 border border-gray-300 rounded text-sm outline-none focus:border-gray-400"
              />
            </div><div className="mb-3">
              <label className="block text-sm text-black-700 mb-1">Password:</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-2 py-2 border border-gray-300 rounded text-sm outline-none focus:border-gray-400"
              />
            </div><div className="mb-3">
              <label className="block text-sm text-black-700 mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-2 py-2 border border-gray-300 rounded text-sm outline-none focus:border-gray-400"
              />
            </div><div className="mb-3">
              <label className="block text-sm text-black-700 mb-1">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full px-2 py-2 border border-gray-300 rounded text-sm outline-none focus:border-gray-400"
              />
            </div>
            {error && <p className="text-red-700 text-xs mt-2 text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 active:scale-x-95 text-white text-sm rounded cursor-pointer border-none"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <span
            onClick={() => navigate('/login')}
            className="block text-center mt-3 text-sm text-blue-600 underline cursor-pointer hover:text-blue-800"
          >
            Already have an account? Login here
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register
