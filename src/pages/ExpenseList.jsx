import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { getExpenses, deleteExpense } from '../services/api'

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses()
      setExpenses(res.data)
    } catch (err) {
      setError('Failed to load expenses')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchExpenses() }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id)
        setExpenses(expenses.filter((e) => e.id !== id))
      } catch (err) {
        setError('Failed to delete expense')
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 min-h-screen px-5 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-md px-10 py-8 shadow-sm">
          <h2 className="text-xl font-bold text-center text-gray-700 mb-5">Expense List</h2>

          {loading && <p className="text-gray-400 text-sm text-center py-5">Loading...</p>}
          {error && <p className="text-red-700 text-sm text-center">{error}</p>}
          {!loading && expenses.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-5">No expenses found. Add your first expense!</p>
          )}

          {expenses.map((expense) => (
            <div key={expense.id} className="py-3 border-b border-gray-100 last:border-b-0">
              <div className="text-sm font-bold text-green-600 mb-1">{expense.expenseName}</div>
              <div className="text-xs text-gray-700 mb-1">
                <strong>Amount:</strong> ${parseFloat(expense.amount).toFixed(2)}
              </div>
              <div className="text-xs text-gray-700 mb-1">
                <strong>Date:</strong> {expense.date}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => navigate(`/update-expense/${expense.id}`)}
                  className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded border-none cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="px-4 py-1 bg-red-700 hover:bg-red-800 text-white text-xs rounded border-none cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ExpenseList
