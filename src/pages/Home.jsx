import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-red-200 min-h-screen px-5 py-8">
        <div className="max-w-5x mx-auto bg-white rounded-2xl px-10 py-8 shadow-sm">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-3">Welcome to Expense Tracker</h2>
          <div className="flex justify-center gap-6 mb-4">
            <Link to="/add-expense" className="text-green-600 text-sm hover:underline">Add Expense</Link>
            <Link to="/expenses" className="text-green-600 text-sm hover:underline">Expense List</Link>
          </div>
          <p className="text-gray-500 text-sm">
            Track and manage your expenses effectively. Use the navigation links to add new expenses or view your expense history.
          </p>
        </div>
      </div>
    </>
  )
}

export default Home
