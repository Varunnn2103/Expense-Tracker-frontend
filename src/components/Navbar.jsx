import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <div className="bg-white border-b border-gray-200 px-5 py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/home">
        <span className="text-lg font-bold text-gray-700">Expense Tracker</span>
        </Link>
        <div className="flex gap-5 items-center">
          <Link to="/add-expense" className="text-green-600 text-sm hover:underline">Add Expense</Link>
          <Link to="/expenses" className="text-green-600 text-sm hover:underline">Expense List</Link>
          {user && (
            <button
              onClick={handleLogout}
              className="text-red-700 text-sm bg-transparent border-none cursor-pointer p-0 hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
